import { Prisma } from "@prisma/client";

export const users: Prisma.UserUncheckedCreateInput[]= [
    {
        id: 1,
      userName: "user1",
      email: "user1@example.com",
      password: "password1",
      isAuthor: true,
    },
    {
        id: 2,
      userName: "user2",
      email: "user2@example.com",
      password: "password2",
      isAuthor: false,
    },
    { id: 3,
      userName: "user3",
      email: "user3@example.com",
      password: "password3",
      isAuthor: true,
    },
  ];