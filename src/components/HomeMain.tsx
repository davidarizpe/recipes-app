"use client";
import RecipeCard from "@/components/recipe card";
import type { Recipe } from "@/types/recipe";
import { PrismaClient } from "@prisma/client";
import { useState, useEffect } from "react";

const prisma = new PrismaClient();

export default function HomeMain() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await prisma.recipe.findMany({});
      setRecipes(recipes);
    };
    fetchRecipes();
  }, []);

  return (
    <main className="main flex flex-wrap gap-5 max-w-full md:max-w-[90%]">
      {recipes.map((recipe: Recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </main>
  );
}
