"use client";
import { useState, useEffect } from "react";
import Nav from "@/components/nav";
import Link from "next/link";
import createUser from "@/libs/singup";
import type { User } from "@/types/users";

export default function RegisterPageComponent() {
  const [user, setUser] = useState<Omit<User, "recipes"> | undefined>(
    undefined
  );
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.username === "") {
      values.username = values.firstname + values.lastname;
    }

    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        const result = await createUser(values);
        setUser(result.user);
      } catch (error) {
        alert("An error occurred");
        console.error(error);
      }
    }
  };

  return (
    <div className="App flex items-center justify-center min-h-[120vh]">
      <Nav />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-md p-6 rounded-xl mt-5 bg-gray-900 text-white border border-gray-700 absolute top-[30%]"
      >
        <p className="text-2xl font-semibold text-sky-400 relative pl-8">
          Register
          <span className="absolute top-2 left-0 h-4 w-4 rounded-full bg-sky-400 animate-pulse"></span>
        </p>
        <p className="text-sm text-gray-400">
          Signup now and get full access to our app.
        </p>

        <div className="flex gap-3">
          <label className="relative flex-1">
            <input
              className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-sky-400"
              type="text"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <span
              className={`absolute left-3 top-4 text-gray-500 text-sm transition-all ${
                values.firstname
                  ? "top-0 text-xs text-sky-400"
                  : "top-4 text-sm"
              }`}
            >
              Firstname
            </span>
          </label>

          <label className="relative flex-1">
            <input
              className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-sky-400"
              type="text"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <span
              className={`absolute left-3 top-4 text-gray-500 text-sm transition-all ${
                values.lastname ? "top-0 text-xs text-sky-400" : "top-4 text-sm"
              }`}
            >
              Lastname
            </span>
          </label>
        </div>

        <label className="relative">
          <input
            className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-sky-400"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            autoComplete="off"
          />
          <span
            className={`absolute left-3 top-4 text-gray-500 text-sm transition-all ${
              values.username ? "top-0 text-xs text-sky-400" : "top-4 text-sm"
            }`}
          >
            Username
          </span>
        </label>

        <label className="relative">
          <input
            className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-sky-400"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <span
            className={`absolute left-3 top-4 text-gray-500 text-sm transition-all ${
              values.email ? "top-0 text-xs text-sky-400" : "top-4 text-sm"
            }`}
          >
            Email
          </span>
        </label>

        <label className="relative">
          <input
            className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-sky-400"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            autoComplete="off"
            maxLength={20}
            minLength={4}
            required
          />
          <span
            className={`absolute left-3 top-4 text-gray-500 text-sm transition-all ${
              values.password ? "top-0 text-xs text-sky-400" : "top-4 text-sm"
            }`}
          >
            Password
          </span>
        </label>

        <label className="relative">
          <input
            className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-sky-400"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <span
            className={`absolute left-3 top-4 text-gray-500 text-sm transition-all ${
              values.confirmPassword
                ? "top-0 text-xs text-sky-400"
                : "top-4 text-sm"
            }`}
          >
            Confirm Password
          </span>
        </label>

        <button className="w-full py-2 bg-sky-400 rounded-lg text-lg font-medium hover:bg-sky-300 transition-colors">
          Submit
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/singin" className="text-sky-400 hover:underline">
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
}
