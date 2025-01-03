"use client";
import LoginPageComponent from "@/components/loginPageComponent";
import Error from "@/components/505";

export default function Singin() {
  if (typeof window !== "undefined") {
    console.log("window is available");
  } else {
    console.error("window is not available");
    return <Error />;
  }
  return <LoginPageComponent />;
}
