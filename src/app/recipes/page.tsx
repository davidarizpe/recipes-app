"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Recipe } from "@/types/recipe";
import Nav from "@/components/nav";
import Loading from "../loading";
import getRecipe from "@/libs/getRecipe";
import Image from "next/image";

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
        </>
      )}
    </div>
  );
}
