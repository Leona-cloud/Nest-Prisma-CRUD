import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services';
import { SignInDto, SignUpDto } from 'src/auth/dtos';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return await this.authService.SignUp(signUpDto);
  }

  @Post('login')
  async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return await this.authService.SignIn(signInDto);
  }
}
