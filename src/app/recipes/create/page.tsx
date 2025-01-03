"use client";
import React, { useState } from "react";
import newRecipe from "@/libs/newRecipe";
import Link from "next/link";
import type {
  ingredientsInterface,
  instruccionsInterface,
  NewRecipe,
} from "@/types/newRecipe";
import { FormEvent } from "react";

export default function CreateRecipe() {
  const [data, setData] = useState<NewRecipe>({
    title: "",
    description: "",
    kcal: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    serving: 0,
    serving_grams: 0,
    cookTime: 0,
    ingredients: "[]",
    instruccions: "[]",
  });
  const [ingredients, setIngredients] = useState<ingredientsInterface[]>([]);
  const [newIngredient, setNewIngredient] = useState<ingredientsInterface>({
    ingredient: "",
    amount: "",
  });
  const [instruccions, setInstruccions] = useState<instruccionsInterface[]>([]);
  const [newInstruccion, setNewInstruccion] = useState({
    instruccion: "",
  });

  const handleAddIngredient = () => {
    if (
      typeof newIngredient !== "string" &&
      newIngredient.ingredient &&
      newIngredient.amount
    ) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient({ ingredient: "", amount: "" });
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddInstruccion = () => {
    if (newInstruccion.instruccion) {
      setInstruccions([...instruccions, newInstruccion]);
      setNewInstruccion({ instruccion: "" });
    }
  };

  const handleRemoveInstruccion = (index: number) => {
    setInstruccions(instruccions.filter((_, i) => i !== index));
  };

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = JSON.parse(window.localStorage.getItem("user") || "{}");
    data.cookTime = Number(data.cookTime);
    data.ingredients = JSON.stringify(ingredients);
    data.instruccions = JSON.stringify(instruccions);

    await newRecipe(data, user).then((newRecipe) => {
      alert("Recipe created successfully");
      console.log(newRecipe);
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="relative max-w-3xl w-full bg-gray-800 p-8 shadow-md rounded-lg">
        <Link href="/" className="absolute top-2 right-2 hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
          </svg>
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create a New Recipe
        </h1>
        <form onSubmit={handleSumbit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              maxLength={30}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 placeholder-gray-400"
              placeholder="Recipe title"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              description
            </label>
            <input
              type="text"
              id="description"
              maxLength={50}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 placeholder-gray-400"
              placeholder="Recipe description"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label htmlFor="servings" className="block text-sm font-medium">
              servings
            </label>
            <input
              type="number"
              min={1}
              max={30}
              id="servings"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 placeholder-gray-400"
              placeholder="Servings"
              onChange={(e) =>
                setData({ ...data, serving: Number(e.target.value) })
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="servingsgrams"
              className="block text-sm font-medium"
            >
              servings grams
            </label>
            <input
              type="number"
              id="servingsgrams"
              min={1}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 placeholder-gray-400"
              placeholder="Recipe servings grams"
              onChange={(e) =>
                setData({ ...data, serving_grams: Number(e.target.value) })
              }
            />
          </div>

          <div className="mb-4">
            <label htmlFor="calories" className="block text-sm font-medium">
              calories
            </label>
            <input
              type="number"
              id="calories"
              min={1}
              max={999}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 placeholder-gray-400"
              placeholder="Recipe calories"
              onChange={(e) =>
                setData({ ...data, kcal: Number(e.target.value) })
              }
              required
            />
          </div>

          <section className="macros flex justify-between gap-3">
            <div className="mb-4 flex-grow">
              <label htmlFor="protein" className="block text-sm font-medium">
                protein
              </label>
              <input
                type="number"
                id="protein"
                min={1}
                max={999}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 placeholder-gray-400"
                placeholder="Recipe protein"
                onChange={(e) =>
                  setData({ ...data, protein: Number(e.target.value) })
                }
                required
              />
            </div>
            <div className="mb-4 flex-grow">
              <label htmlFor="fat" className="block text-sm font-medium">
                fat
              </label>
              <input
                type="number"
                id="fat"
                min={1}
                max={999}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 placeholder-gray-400"
                placeholder="Recipe fat"
                onChange={(e) =>
                  setData({ ...data, fat: Number(e.target.value) })
                }
                required
              />
            </div>
            <div className="mb-4 flex-grow">
              <label htmlFor="carbs" className="block text-sm font-medium">
                carbs
              </label>
              <input
                type="number"
                id="carbs"
                min={1}
                max={999}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 placeholder-gray-400"
                placeholder="Recipe carbs"
                onChange={(e) =>
                  setData({ ...data, carbs: Number(e.target.value) })
                }
                required
              />
            </div>
          </section>

          <div className="mb-6">
            <label className="block text-sm font-medium">Ingredients</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Ingredient"
                  value={newIngredient.ingredient}
                  onChange={(e) =>
                    setNewIngredient({
                      ...newIngredient,
                      ingredient: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 placeholder-gray-400"
                />
                <input
                  type="number"
                  placeholder="Grams"
                  value={newIngredient.amount}
                  onChange={(e) =>
                    setNewIngredient({
                      ...newIngredient,
                      amount: e.target.value,
                    })
                  }
                  min={1}
                  className="w-24 bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="bg-blue-600 text-white rounded-md px-3 py-2 hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>

            {ingredients.length > 0 && (
              <details className="mt-4">
                <summary>List of ingredients ({ingredients.length})</summary>
                <table className="w-full text-left text-gray-200">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="px-4 py-2">Ingredient</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Remove</th>
                      <th className="px-4 py-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map(
                      (item: ingredientsInterface, index: number) => (
                        <tr key={index} className="bg-gray-800">
                          <td className="px-4 py-2">{item.ingredient}</td>
                          <td className="px-4 py-2">{item.amount} gramms</td>
                          <td className="px-4 py-2">
                            <button
                              type="button"
                              onClick={() => handleRemoveIngredient(index)}
                              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                            >
                              Remove
                            </button>
                          </td>
                          <td className="px-4 py-2">
                            <button
                              type="button"
                              onClick={() => {
                                setNewIngredient(item);
                                handleRemoveIngredient(index);
                              }}
                              className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-700"
                            >
                              Change
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </details>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium">Instruccions</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Instruccions"
                  value={newInstruccion.instruccion}
                  onChange={(e) =>
                    setNewInstruccion({
                      ...newInstruccion,
                      instruccion: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 placeholder-gray-400"
                />

                <button
                  type="button"
                  onClick={handleAddInstruccion}
                  className="bg-blue-600 text-white rounded-md px-3 py-2 hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>

            {instruccions.length > 0 && (
              <details className="mt-4">
                <summary>List of instruccions ({instruccions.length})</summary>
                <table className="w-full text-left text-gray-200">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="px-4 py-2">Instruccion</th>
                      <th className="px-4 py-2">Remove</th>
                      <th className="px-4 py-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instruccions.map(
                      (item: instruccionsInterface, index: number) => (
                        <tr key={index} className="bg-gray-800">
                          <td className="px-4 py-2">{item.instruccion}</td>
                          <td className="px-4 py-2">
                            <button
                              type="button"
                              onClick={() => handleRemoveInstruccion(index)}
                              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                            >
                              Remove
                            </button>
                          </td>
                          <td className="px-4 py-2">
                            <button
                              type="button"
                              onClick={() => {
                                setNewInstruccion(item);
                                handleRemoveInstruccion(index);
                              }}
                              className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-700"
                            >
                              Change
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </details>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="cooktime" className="block text-sm font-medium">
              cook time
            </label>
            <input
              type="number"
              id="cooktime"
              min={1}
              max={9999}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 placeholder-gray-400"
              placeholder="Recipe cook time(minutes)"
              onChange={(e) =>
                setData({ ...data, cookTime: Number(e.target.value) })
              }
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white rounded-md py-2 hover:bg-green-700"
            >
              Save Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
