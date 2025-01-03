"use client";
import UserPageComponent from "@/components/userPageComponent";
import Error from "@/components/505";

export default function User() {
  if (typeof window !== "undefined") {
    console.log("window is available");
  } else {
    console.error("window is not available");
    return <Error />;
  }

  return <UserPageComponent />;
}
