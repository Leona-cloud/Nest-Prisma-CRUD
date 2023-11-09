import { SetMetadata } from '@nestjs/common';
import { RequiredRule } from '../interfaces';

export const CHECK_ABILITY = 'check_ability';

export const checkAbilities = (...requiredRules: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requiredRules);
