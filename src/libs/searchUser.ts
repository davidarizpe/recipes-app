"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function searchUser(email: string, password: string) {
  const users = await prisma.users.findUnique({
    where: {
      email: email,
      password: password,
    },
  });
  return users;
}
