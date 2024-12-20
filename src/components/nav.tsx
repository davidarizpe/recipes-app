"use client";
import { usePathname } from "next/navigation";
import getUser from "@/libs/getUser";
import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="navbar absolute top-0 z-[0] bg-slate-700 text-white w-full flex justify-between items-center px-5 py-3 box-border">
      <div className="header">
        <h1 className="title">Recipes app</h1>
      </div>
      <div className="nav-buttons flex gap-3">
        <Link href="/" className={pathname === "/" ? "active" : "unactive"}>
          Home
        </Link>
        <Link
          href="/singin"
          className={pathname === "/singin" ? "active" : "unactive"}
        >
          Sing in
        </Link>
        <Link
          href="/singup"
          className={pathname === "/singup" ? "active" : "unactive"}
        >
          Sing up
        </Link>
        {getUser() && (
          <Link
            href="/user"
            className={pathname === "/user" ? "active" : "unactive"}
          >
            user
          </Link>
        )}
      </div>
    </div>
  );
}
