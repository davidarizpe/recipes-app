"use server";
import type { Recipe as RecipeInterface } from "@/types/recipe";
import type { User } from "@/types/users";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function newRecipe(data: RecipeInterface, user: User) {
  if (!data.title) throw new Error("Title is required");
  if (!user) throw new Error("User is required");
  if (!data.kcal) throw new Error("Calories is required");

  const protein = isNaN(data.protein) ? 0 : data.protein;
  const fat = isNaN(data.fat) ? 0 : data.fat;
  const carbs = isNaN(data.carbs) ? 0 : data.carbs;
  const serving = isNaN(data.serving) ? 0 : data.serving;
  const serving_grams = isNaN(data.serving_grams) ? 0 : data.serving_grams;
  const cookTime = isNaN(data.cookTime) ? 0 : data.cookTime;

  const ingredients = Array.isArray(data.ingredients)
    ? JSON.stringify(data.ingredients)
    : "[]";
  const instruccions = Array.isArray(data.instruccions)
    ? JSON.stringify(data.instruccions)
    : "[]";

  const newRecipe = await prisma.recipe.create({
    data: {
      title: data.title,
      description: data.description || "",
      protein,
      fat,
      carbs,
      ingredients,
      instruccions,
      serving,
      servig_grams: serving_grams,
      cookTime,
      kcal: data.kcal,
      userId: user.id,
    },
  });

  return newRecipe;
}
