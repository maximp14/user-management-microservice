import { CreateUserDto } from './../dto/create-user.dto';
import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing';
import { User } from './../entity/user.entity';
import { Repository } from 'typeorm';
import { DeepMocked } from '@golevelup/ts-jest';
import { EmailService } from './../../email/email.service';
import { UserService } from './../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';


describe("UserService",()=>{
    let userService: UserService;
    let userRepository: Repository<User>;
    let emailService: DeepMocked<EmailService>;

    beforeEach(async () =>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [ 
                UserService, 
                { provide: getRepositoryToken(User), useClass: Repository}, 
                { provide: EmailService, useValue: createMock<EmailService>}
            ],
        }).compile()
        userService = module.get<UserService>(UserService)
        userRepository = module.get<Repository<User>>(getRepositoryToken(User))
        emailService = module.get(EmailService)
    })

    it("should be defined", () => {
        expect(userService).toBeDefined();
    });

    describe('find by id', () =>{
        const user = {
            id: 1,
            name: "Unit",
            lastName: "Test",
            address: "Evergreen 1000",
            email: "test@test.com",
            password: "somepass",
            phoneNumber: "1231231",
            profilePicture: "asdas"
        }
        it('should find user by id', async () =>{
            jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user as any)
            expect(await userService.findById(1)).toEqual(user)
        })

        it('should throw an error', async ()=>{
            jest.spyOn(userService, 'findById').mockRejectedValueOnce(new Error('User not found'))

            //expect(await userService.findById(2)).toThrowError('User not found')
        })
    })
    
})