import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import logger from 'moment-logger';
import { cloneDeep } from 'lodash';
import { users } from './user';
import { notes } from './note';

async function main() {
  for (let user of users) {
    await prisma.user.upsert({
      where: {
        id: user.id,
      },
      update: {},
      create: user,
     
    });
  }

  for (let note of notes) {
    await prisma.note.upsert({
      where: {
        id: note.id,
      },
      update: {},
      create: note
    });
  }

}

main()
  .then(() => {
    logger.info('Database seeding successful');
  })
  .catch((err) => {
    logger.error(`Database seeding failed ${err}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
