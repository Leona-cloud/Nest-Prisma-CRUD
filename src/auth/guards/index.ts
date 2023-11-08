import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../services';
import { DataStoredInToken, RequestWithUser } from '../interfaces';
import { Request } from 'express';
import {
  AuthTokenValidationException,
  InvalidTokenException,
  PrismaNetworkException,
  UserNotFoundException,
} from '../errors';
import logger from 'moment-logger';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as RequestWithUser;
    const token = this.extractToken(request);
    if (!token) {
      throw new InvalidTokenException(
        'Authorization Header is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const payload: DataStoredInToken = await this.jwtService.verifyAsync(
        token,
        { secret: 'mySecret' },
      );
      const user = await this.authService.findUserById(+payload.sub);
      if (!user) {
        throw new UserNotFoundException(
          'Unauthorized',
          HttpStatus.UNAUTHORIZED,
        );
      }
      request.user = user;
    } catch (error) {
      logger.log(error);
      switch (true) {
        case error instanceof UserNotFoundException: {
          throw error;
        }
        case error.name == 'PrismaClientKnownRequestError': {
          throw new PrismaNetworkException(
            'Unable to process request. Please try again',
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }

        default: {
          throw new AuthTokenValidationException(
            'Invalid token or token expired',
            HttpStatus.UNAUTHORIZED,
          );
        }
      }
    }
    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
