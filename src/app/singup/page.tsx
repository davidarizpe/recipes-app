"use client";
import RegisterPageComponent from "@/components/registerPageComponent";
import Error from "@/components/505";

export default function Signup() {
  if (typeof window !== "undefined") {
    console.log("window is available");
  } else {
    console.error("window is not available");
    return <Error />;
  }

  return <RegisterPageComponent />;
}
