import { HttpException } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  name: 'InvalidCredentialsException';
}
