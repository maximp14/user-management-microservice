import { loginType } from "./types/login.type";
import { CreateUserDto } from "./../user/dto/create-user.dto";
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(
    email: string,
    pass: string
  ): Promise<Omit<CreateUserDto, "password">> {
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
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: user.email, id: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      user: payload,
      token: access_token,
    };
  }

  async confirmEmail(token: string): Promise<{ message: string }> {
    const email = await this.decodeToken(token);
    const user = await this.userService.findByEmail(email);

    if (user.isActive && user.isActive === true) {
      throw new BadRequestException("Email already confirmed");
    }
    await this.userService.activateUser(email);

    return { message: "Email confirmed successfully" };
  }

  async decodeToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get("JWT_SECRET"),
      });

      if (typeof payload === "object" && "email" in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === "TokenExpiredError") {
        throw new BadRequestException("Email confirmation token expired");
      }
      throw new BadRequestException("Bad confirmation token");
    }
  }
}
