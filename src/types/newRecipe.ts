import type { Recipe } from "./recipe";

export interface ingredientsInterface {
  ingredient: string;
  amount: string;
}

export interface instruccionsInterface {
  instruccion: string;
}

export type NewRecipe = Omit<Recipe, "id" | "createdAt" | "userId"> & {
  ingredients: string | ingredientsInterface[];
  instruccions: string | instruccionsInterface[];
};
