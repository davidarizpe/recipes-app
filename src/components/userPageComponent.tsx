"use client";
import { useState, useEffect } from "react";
import type { User } from "@/types/users";
import type { Recipe } from "@/types/recipe";
import RecipeCard from "@/components/recipe card";
import Nav from "@/components/nav";
import Link from "next/link";

const emptyUser: User = {
  id: 0,
  name: "",
  username: "",
  email: "",
  password: "",
  createdAt: new Date(),
  recipes: [],
};

export default function UserPageComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<User>(emptyUser);

  const date = new Date(user.createdAt).toDateString();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = window.localStorage.getItem("user");
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        setUser({ ...parsedUser, createdAt: new Date(parsedUser.createdAt) });
      } else {
        window.location.href = "/";
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <div className="App flex flex-col items-center justify-center min-h-[100vh]">
      <Nav />
      <main className="main absolute top-[30%]">
        <h2 className="subtitle font-semibold m-5 text-4xl md:text-5xl">
          Welcome {user.username}!
        </h2>
        <section className="data flex flex-col items-center">
          <span>email: {user.email}</span> <br />
          <label className="flex items-center justify-center gap-3 h-10">
            password:{" "}
            <input
              type={showPassword ? "text" : "password"}
              value={user.password}
              readOnly
              className="bg-transparent"
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {" "}
              <br />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </label>
          <span>User create at: {date}</span>
        </section>
        <section className="recipes flex flex-col items-center">
          <h3 className="font-semibold m-3 mt-5 text-3xl md:text-3.5xl">
            Recipes
          </h3>
          {user.recipes && user.recipes.length > 0 ? (
            user.recipes.map((recipe: Recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <span>You do not have any recipes</span>
          )}
        </section>
        <section className="option flex justify-center gap-5 m-10">
          <Link
            className="btn py-3 px-5 rounded-2xl bg-blue-500 hover:scale-110 hover:bg-blue-600"
            href="/recipes/create"
          >
            Create recipe
          </Link>
          <button
            className="btn py-3 px-5 rounded-2xl bg-blue-500 hover:scale-110 hover:bg-blue-600"
            onClick={() => {
              setUser(emptyUser);
            }}
          >
            Logout
          </button>
        </section>

        <style>
          {`
          .btn {
            transition: all 0.2s ease-in-out;
          }
        `}
        </style>
      </main>
    </div>
  );
}
