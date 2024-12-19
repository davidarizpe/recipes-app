export interface Ingredient {
  name: string;
  amount: string;
}

export interface Macros {
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface Recipe {
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  image: string | null;
  calories: number;
  servings: number;
  servingGrams: number;
  macros?: Macros;
  cookTime: number;
}
