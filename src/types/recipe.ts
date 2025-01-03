import type { User } from "./users";

export interface Recipe {
  id: number;
  title: string;
  description: string | null;
  image?: string;
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  ingredients: string;
  instruccions: string;
  serving: number;
  serving_grams: number;
  cookTime: number;
  createdAt: Date;
  userId: number | null;
  user?: User;
}
