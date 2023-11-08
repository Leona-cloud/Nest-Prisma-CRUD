import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/services';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from 'src/dtos';
import { DuplicateUserException } from 'src/users/errors';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  //method to hash password

  private async passwordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  //   compare passwords

  private async comparePasswords(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async SignUp(options: SignUpDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: options.email,
      },
    });
    if (user) {
      throw new DuplicateUserException(
        `An account with ${options.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.passwordHash(options.password);
    const createUserOptions: Prisma.UserUncheckedCreateInput = {
      email: options.email,
      userName: options.userName,
      password: hashedPassword,
    };

    const createdUser = await this.prisma.user.create({
      data: createUserOptions
    })
    const accessToken = await this.jwtService.signAsync({
      sub: createdUser.id
    })
    
    return {
      success: true,
      message: 'User created successfully',
      data: accessToken
    }

  }
}
