import { loginType } from './types/login.type';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<loginType> {
    const result = this.authService.login(loginDto);

    return result;
  }
}
