import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { AuthService } from '../services';
import { SignInDto, SignUpDto } from 'src/auth/dtos';
import { Request } from 'express';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body(ValidationPipe) signUpDto: SignUpDto,
    @Req() req: Request,
  ) {
    return await this.authService.SignUp(signUpDto);
  }

  @Post('login')
  async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return await this.authService.SignIn(signInDto);
  }
}
