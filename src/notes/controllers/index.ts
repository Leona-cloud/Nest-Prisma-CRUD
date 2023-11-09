import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { NotesService } from '../services';
import { AuthGuard } from 'src/auth/guards';
import { User } from '../decorators';
import { User as UserModel } from '@prisma/client';
import { CreateNotesDto, UpdateNotesDto } from '../dtos';
import { AbilitiesGuard } from 'src/ability/guards';
import { checkAbilities } from 'src/ability/decorator';
import { Actions } from 'src/ability/interfaces';

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

  @Put("/:id")
  @UseGuards(AbilitiesGuard)
  @checkAbilities({action: Actions.Update, subject: "Note"})
  async updateNote(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateNoteDto: UpdateNotesDto,
    @User() user: UserModel
  ) {
    return this.notesService.UpdateNote(updateNoteDto, id)
  }
}
