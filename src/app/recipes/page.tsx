"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Recipe } from "@/types/recipe";
import Nav from "@/components/nav";
import Loading from "../loading";
import getRecipe from "@/libs/getRecipe";
import Image from "next/image";
import PieChart from "@/components/PieChart";
import type {
  ingredientsInterface,
  instruccionsInterface,
} from "@/types/newRecipe";

export default function Recipes() {
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      getRecipe(Number(id))
        .then((data) => setRecipe(data))
        .catch((error) => console.error(error))
        .finally(() => setLoad(false));
    }
  }, [searchParams]);

  const labels = ["Protein", "Carbs", "Fat"];
  const datasets = [
    {
      data: [recipe?.protein, recipe?.fat, recipe?.carbs].map(
        (item) => item ?? 0
      ),
      backgroundColor: ["#FF4500", "#1E90FF", "#FFD700"],
      hoverBackgroundColor: ["#FF4500", "#1E90FF", "#FFD700"],
    },
  ];

  const ingredients = recipe?.ingredients ? JSON.parse(recipe.ingredients) : [];

  const instructions = recipe?.instruccions
    ? JSON.parse(recipe.instruccions)
    : [];

  return (
    <div className="App m-5 flex flex-col items-center justify-center min-h-[100vh]">
      {load ? (
        <Loading />
      ) : (
        <>
          <Nav />
          <main className="main absolute top-[30%]">
            {recipe?.image && (
              <Image
                src={`/images/${recipe?.image}`}
                alt={recipe?.title}
                width={500}
                height={500}
                className="w-full h-auto rounded-md"
              />
            )}
            <h2 className="subtitle text-3xl md:text-4xl font-semibold font-sans">
              {recipe?.title}
            </h2>
            <p className="text-sm extradata">{recipe?.description}</p>
            {recipe?.kcal && (
              <section className="nutritions">
                <h3 className="subtitle text-2xl md:text-3xl font-semibold font-sans">
                  Nutrition Facts
                </h3>
                <div className="facts flex gap-5 items-center justify-center mt-5">
                  <PieChart
                    labels={labels}
                    datasets={datasets}
                    total={recipe?.kcal}
                  />
                  <ul className="flex flex-col gap-5">
                    <li className="flex gap-3">
                      <div className="square w-[20px] h-[20px] bg-[#FF4500] rounded-sm" />{" "}
                      Protein: {recipe?.protein} grams
                    </li>
                    <li className="flex gap-3">
                      <div className="square w-[20px] h-[20px] bg-[#1E90FF] rounded-sm" />{" "}
                      Fat: {recipe?.fat} grams
                    </li>
                    <li className="flex gap-3">
                      <div className="square w-[20px] h-[20px] bg-[#FFD700] rounded-sm" />{" "}
                      Carbs: {recipe?.carbs} grams
                    </li>
                  </ul>
                </div>
                <details>
                  <summary className="subtitle text-2xl md:text-3xl font-semibold font-sans">
                    Ingredients
                  </summary>
                  <ol className="mt-3 flex flex-col items-center gap-2 list-decimal">
                    {ingredients.map(
                      (ingredient: ingredientsInterface, index: number) => (
                        <li className="text-xl" key={index}>
                          {ingredient.ingredient}: {Number(ingredient.amount)}{" "}
                          grams
                        </li>
                      )
                    )}
                  </ol>
                </details>
                <details>
                  <summary className="subtitle text-2xl md:text-3xl font-semibold font-sans">
                    Intructions
                  </summary>
                  <ol className="mt-3 flex flex-col items-center gap-2 list-decimal">
                    {instructions.map(
                      (instruction: instruccionsInterface, index: number) => (
                        <li className="text-xl" key={index}>
                          {instruction.instruccion}
                        </li>
                      )
                    )}
                  </ol>
                </details>
              </section>
            )}
            <span className="text-md mt-5 extradata">
              Cook time: {recipe?.cookTime} minutes
            </span>
          </main>
        </>
      )}
    </div>
  );
}
