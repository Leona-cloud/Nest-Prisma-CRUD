import { HttpException } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  name: 'InvalidCredentialsException';
}

export class DuplicateUserException extends HttpException {
  name: 'DuplicateUserException';
}

export class InvalidTokenException extends HttpException {
  name: 'InvalidTokenException';
}

export class UserNotFoundException extends HttpException {
  name: 'UserNotFoundException';
}

export class AuthTokenValidationException extends HttpException {
  name: 'AuthTokenValidationException';
}

export class PrismaNetworkException extends HttpException {
  name: 'PrismaNetworkException';
}
