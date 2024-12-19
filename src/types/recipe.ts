import type { User } from "./users";

export interface Recipe {
  id: number;
  title: string;
  description?: string;
  protein: number;
  fat: number;
  carbs: number;
  ingredients: string;
  serving: number;
  servingGrams: number;
  cookTime: number;
  createdAt: Date;
  userId: number | null;
  user?: User;
}
