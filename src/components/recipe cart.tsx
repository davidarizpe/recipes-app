import Image from "next/image";
import type { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCart({ recipe }: RecipeCardProps) {
  const { image, title, calories, cookTime } = recipe;

  return (
    <div className="cart w-[300px] bg-slate-800 text-white cursor-pointer p-5 rounded-lg transition-all hover:scale-105 active:scale-95">
      {image && (
        <Image
          src={`/images/${image}`}
          alt={title}
          width={200}
          height={200}
          className="w-full h-auto rounded-md"
        />
      )}
      <h2 className="subtitle text-[2.5rem] md:text-[3rem]">{title}</h2>
      <span className="text-sm extradata">
        {calories} kcal | {cookTime} minutes
      </span>
    </div>
  );
}
