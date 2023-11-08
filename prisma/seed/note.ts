import { Prisma } from '@prisma/client';

export const notes: Prisma.NoteUncheckedCreateInput[] = [
  {
    id: 1,
    title: 'Note 1',
    body: 'This is the body of Note 1',
    isStarred: true,
    authorId: 1, // Use the ID of the corresponding user
  },
  {
    id: 2,
    title: 'Note 2',
    body: 'This is the body of Note 2',
    isStarred: false,
    authorId: 2, // Use the ID of the corresponding user
  },
  {
    id: 3,
    title: 'Note 3',
    body: 'This is the body of Note 3',
    isStarred: true,
    authorId: 1,
  },
];
