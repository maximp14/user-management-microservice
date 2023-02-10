import { loginType } from "./types/login.type";
import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<loginType> {
    const result = await this.authService.login(loginDto);

    res.cookie("access_token", result.token, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });

    return result;
  }

  @Post("/confirm")
  async confirmEmail(@Body() confirmDto: { token: string }) {
    return this.authService.confirmEmail(confirmDto.token);
  }
}
