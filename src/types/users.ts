import type { Recipe } from "./recipe";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  recipes: Recipe[];
}
