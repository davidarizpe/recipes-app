import type { Recipe } from "@/types/recipe";
import RecipeCard from "@/components/recipe card";
import Nav from "@/components/nav";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const recipes = await prisma.recipe.findMany();
  return (
    <div className="App flex flex-col items-center justify-center min-h-[100vh]">
      <Nav />
      <div className="grid">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
