"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getRecipe(id: number) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
  });
  return recipe;
}
