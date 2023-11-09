import { AbilityBuilder } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/services';
import { Actions, AppAbility } from '../interfaces';
import { createPrismaAbility } from '@casl/prisma';

@Injectable()
export class AbilitiesService {
  constructor(private prisma: PrismaService) {}
  async checkAbility(user: User) {
    const userExist = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        isAuthor: true,
      },
    });

    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );

    //Author
    can(Actions.Create, 'Note');
    can(Actions.Delete, 'Note');
    can(Actions.Update, 'Note');
    can(Actions.Read, 'Note');

    if(user.isAuthor !== true){
        cannot(Actions.Create, "Note").because(
            "Only authors can create notes"
        )
        cannot(Actions.Delete, "Note").because(
            "Only authors can delete notes"
        )
        cannot(Actions.Update, "Note").because(
            "Only authors can update notes"
        )
    }

    return build()
  }
}
