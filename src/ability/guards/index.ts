import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilitiesService } from '../services';
import { Observable } from 'rxjs';
import { RequiredRule } from '../interfaces';
import { CHECK_ABILITY } from '../decorator';
import { ForbiddenError } from '@casl/ability';
import { RequestWithUser } from 'src/auth/interfaces';
import { AuthorizationGenericException, InsufficientPermissionException } from '../errors';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilities: AbilitiesService,
  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean>{
    if (!this.abilities) {
      throw new Error('Abilities service is not properly injected');
    }
      const rules = this.reflector.get<RequiredRule[]>(
        CHECK_ABILITY,
        context.getHandler()
      ) || []


      const request = context.switchToHttp().getRequest() as RequestWithUser
      if (!request) {
        // Handle the case where the request object is undefined
        return false;
      }
      const { user } = request;
      console.log(user)
      const ability = await this.abilities?.checkAbility(user)
     try {
        for(const rule of rules){
            ForbiddenError.from(ability).throwUnlessCan(
                rule.action,
                rule.subject,
            )
          }

          return true
     } catch (error) {
        switch (true) {
            case error instanceof ForbiddenError: {
                throw new InsufficientPermissionException(
                    error.message,
                    HttpStatus.FORBIDDEN
                );
            }

            default: {
                throw new AuthorizationGenericException(
                    error.message,
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }
     }
  }
}
