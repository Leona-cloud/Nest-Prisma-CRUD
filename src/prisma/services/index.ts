import { Injectable, INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import logger from 'moment-logger';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    logger.log('Connecting to the DB...');
    await this.$connect();
    logger.log('Connected to the DB');
  }
}
