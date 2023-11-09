import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { NotesService } from '../services';
import { AuthGuard } from 'src/auth/guards';
import { User } from '../decorators';
import { User as UserModel } from '@prisma/client';
import { CreateNotesDto } from '../dtos';

@UseGuards(AuthGuard)
@Controller({
  path: 'notes',
})
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async createNote(
    @Body(ValidationPipe) createNoteDto: CreateNotesDto,
    @User() user: UserModel,
  ) {
    return await this.notesService.CreateNote(createNoteDto, user);
  }
}
