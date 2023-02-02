import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Post('/reset-password')
  async resetPassword(@Body() resetPasswordBody: { email: string }) {
    return this.userService.resetPassword(resetPasswordBody.email);
  }

  @Patch('/change-password/:id')
  async changePassword(
    @Param('id') id,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(id, changePasswordDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
