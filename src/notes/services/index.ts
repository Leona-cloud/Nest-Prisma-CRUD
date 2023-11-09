import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services';
import { CreateNotesDto } from '../dtos';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async CreateNote(options: CreateNotesDto, user: User) {
    const createNoteOptions: Prisma.NoteUncheckedCreateInput = {
      title: options.title,
      body: options.body,
      authorId: user.id,
    };

    const note = await this.prisma.note.create({
      data: createNoteOptions,
      select: {
        id: true,
        title: true,
        body: true,
        authorId: true,
      },
    });

    return {
      success: true,
      message: 'note created successfully',
      data: note,
    };
  }
}
