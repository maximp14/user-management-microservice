import { EmailModule } from "./../email/email.module";
import { User } from "./entity/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
