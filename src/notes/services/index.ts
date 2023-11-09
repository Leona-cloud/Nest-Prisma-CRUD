import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services';
import { CreateNotesDto, UpdateNotesDto } from '../dtos';
import { Prisma, User } from '@prisma/client';
import { NotesNotFoundException } from '../errors';

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

  async UpdateNote(options: UpdateNotesDto, id: number){

    const note = await this.prisma.note.findUnique({
      where: {
        id: id
      }
    })
    if(!note){
      throw new NotesNotFoundException(
        "Note does not exist",
        HttpStatus.BAD_REQUEST
      )
    }

    await this.prisma.note.update({
      where: {
        id: id
      },
      data: {
        body: options.body
      }
    })

    return {
      success: true,
      message: 'note updated successfully',
      data: note,
    };
    
  }
}
