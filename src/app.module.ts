import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { AbilityModule } from './ability';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    NotesModule,
    AbilityModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
