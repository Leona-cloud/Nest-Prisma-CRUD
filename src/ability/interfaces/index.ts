import { PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects as PrismaSubjects } from '@casl/prisma';
import { Note, User } from '@prisma/client';

export type Subjects = PrismaSubjects<{
  User: User;
  Note: Note;
}>;

export type AppAbility = PureAbility<[string, Subjects], PrismaQuery>;

export enum Actions {
  Read = 'read',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export interface RequiredRule {
  action: Actions;
  subject: Subjects;
}
