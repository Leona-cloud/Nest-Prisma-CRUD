import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/services';
import * as bcrypt from 'bcryptjs';
import { SignInDto, SignUpDto } from 'src/auth/dtos';
import { DuplicateUserException } from '../errors';
import { Prisma } from '@prisma/client';
import { InvalidCredentialsException } from '../errors';

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
      data: createUserOptions,
    });
    const accessToken = await this.jwtService.signAsync({
      sub: createdUser.id,
    });

    return {
      success: true,
      message: 'User created successfully',
      data: accessToken,
    };
  }

  async SignIn(options: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: options.email,
      },
      select: {
        id: true,
        email: true,
        userName: true,
        password: true,
      },
    });

    if (!user) {
      throw new InvalidCredentialsException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    //compare passwords
    const validPassword = await this.comparePasswords(
      options.password,
      user.password,
    );
    if (!validPassword) {
      throw new InvalidCredentialsException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    return {
      success: true,
      message: 'User logged in successfully',
      data: accessToken,
    };
  }
}
