import { UserService } from "./../../user/user.service";
import { AuthService } from "./../auth.service";
import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { ConfigService } from "@nestjs/config";

describe("authService", () => {
  let authService: AuthService;
  let userService: DeepMocked<UserService>;
  let jwtService: DeepMocked<JwtService>;
  let configService: DeepMocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: createMock<UserService>,
        },
        {
          provide: JwtService,
          useValue: createMock<JwtService>,
        },
        {
          provide: ConfigService,
          useValue: createMock<ConfigService>,
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
    configService = module.get(ConfigService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe("login", () => {
    it("should return user not found", async () => {});
  });
});
