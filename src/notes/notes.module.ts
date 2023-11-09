import { Module } from '@nestjs/common';
import { NotesController } from './controllers';
import { NotesService } from './services';
import { AuthService } from 'src/auth/services';

@Module({
  imports: [],
  providers: [NotesService, AuthService],
  controllers: [NotesController],
})
export class NotesModule {}
