import { User, Story, Permission, Role } from '@prisma/client';
import { PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects as PrismaSubjects } from '@casl/prisma';

export type Subjects = PrismaSubjects<{
  User: User;
  Role: Role;
  Permission: Permission;
  Story: Story;
}>;

export type AppAbility = PureAbility<[string, Subjects], PrismaQuery>;

export enum Action {
  Read = 'read',
  Manage = 'manage',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}
