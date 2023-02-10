import { JwtAuthGuard } from "./../auth/guards/jwt-auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ChangePasswordDto } from "./dto/change-password.dto";
import RoleGuard from "../auth/guards/role.guard";
import { Role } from "./role.enun";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  async register(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Get("/:id")
  async findById(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Post("/reset-password")
  async resetPassword(@Body() resetPasswordBody: { email: string }) {
    return this.userService.resetPassword(resetPasswordBody.email);
  }

  @UseGuards(RoleGuard(Role.User))
  @Patch("/change-password/:id")
  async changePassword(
    @Param("id") id,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.userService.changePassword(id, changePasswordDto);
  }

  @UseGuards(RoleGuard(Role.User))
  @Delete("/:id")
  async deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }
}
