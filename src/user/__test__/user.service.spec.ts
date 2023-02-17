import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing";
import { User } from "./../entity/user.entity";
import { Repository } from "typeorm";
import { EmailService } from "./../../email/email.service";
import { UserService } from "./../user.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { userStub } from "./stubs/user.stub";
const bcrypt = require("bcrypt");

describe("UserService", () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useClass: Repository },
        {
          provide: EmailService,
          useValue: { sendVerificationMail: jest.fn() },
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    emailService = module.get<EmailService>(EmailService);
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  describe("findByEmail", () => {
    it("should find user by email", async () => {
      const email = "test@test.com";
      const user = userStub;

      jest.spyOn(userRepository, "findOne").mockResolvedValueOnce(user as any);
      const result = await userService.findByEmail(email);

      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email } });
    });

    it("should throw a NotFoundException when the user is not found", async () => {
      const email = "test@example.com";

      jest.spyOn(userRepository, "findOne").mockResolvedValueOnce(undefined);
      await expect(userService.findByEmail(email)).rejects.toThrow(
        NotFoundException
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email } });
    });
  });

  describe("getUsers", () => {
    it("should return all users", async () => {
      const users = userStub;

      jest.spyOn(userRepository, "find").mockResolvedValueOnce(users as any);
      const returnedUsers = await userService.getUsers();

      expect(returnedUsers).toEqual(users);
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const user = userStub;

      jest.spyOn(userRepository, "findOne").mockResolvedValueOnce(undefined);
      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("hashedPassword");
      jest.spyOn(userRepository, "create").mockReturnValueOnce(user);
      jest.spyOn(userRepository, "save").mockResolvedValueOnce(user);
      const sendVerificationMailSpy = jest.spyOn(
        emailService,
        "sendVerificationMail"
      );

      const result = await userService.create(user);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(sendVerificationMailSpy).toHaveBeenCalledWith(
        user.email,
        user.name
      );
      expect(result).toEqual(user);
    });

    it("should throw a conflict exception if user already exists", async () => {
      const user = userStub;

      user.password = await bcrypt.hash(user.password, 10);
      jest.spyOn(userRepository, "findOne").mockResolvedValueOnce(user);

      expect(userService.create(user)).rejects.toThrowError(ConflictException);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
