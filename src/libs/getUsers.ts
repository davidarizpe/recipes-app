import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getUsers() {
  const users = await prisma.users.findMany();
  return users;
}
