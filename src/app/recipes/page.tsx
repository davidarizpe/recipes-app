"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Recipe } from "@/types/recipe";
import Nav from "@/components/nav";
import Loading from "../loading";
import getRecipe from "@/libs/getRecipe";
import Image from "next/image";
import PieChart from "@/components/PieChart";

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
      data: [recipe?.protein, recipe?.fat, recipe?.carbs],
      backgroundColor: ["#FF4500", "#1E90FF", "#FFD700"],
      hoverBackgroundColor: ["#FF4500", "#1E90FF", "#FFD700"],
    },
  ];

  return (
    <div className="App m-5 flex flex-col items-center justify-center min-h-[100vh]">
      {load ? (
        <Loading />
      ) : (
        <>
          <Nav />
          {recipe?.images && (
            <Image
              src={`/images/${recipe?.images}`}
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
                <PieChart labels={labels} datasets={datasets} />
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
            </section>
          )}
        </>
      )}
    </div>
  );
}
