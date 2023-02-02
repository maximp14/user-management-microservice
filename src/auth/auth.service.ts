import { loginType } from './types/login.type';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<CreateUserDto, 'password'>> {
    const user = await this.userService.findByEmail(email);
    const isValid = await bcrypt.compare(pass, user.password);
    if (user && isValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<loginType> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      user: payload,
      token: access_token,
    };
  }
}
