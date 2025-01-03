"use client";
import { useState, useEffect } from "react";
import HomeMain from "@/components/HomeMain";
import Nav from "@/components/nav";
import Error from "@/components/505";

export default function Home() {
  const [isWindowAvailable, setIsWindowAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsWindowAvailable(true);
    } else {
      setIsWindowAvailable(false);
    }
  }, []);

  if (!isWindowAvailable) {
    return <Error />;
  }

  return (
    <div className="App flex flex-col items-center justify-center min-h-[100vh]">
      <Nav />
      <HomeMain />
    </div>
  );
}
