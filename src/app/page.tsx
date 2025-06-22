"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PackScene } from "./pack-scene";

export type AppState = "pack-selection" | "pack-animating";

const HomePage = () => {
  const router = useRouter();
  const [appState, setAppState] = useState<AppState>("pack-selection");

  const handlePackSelect = () => {
    setAppState("pack-animating");
  };

  const handleSunAnimationComplete = () => {
    router.push("/gem-selection");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden animate-fadeIn">
      <div onClick={handlePackSelect} className="cursor-pointer">
        <PackScene
          isAnimating={appState === "pack-animating"}
          onAnimationComplete={handleSunAnimationComplete}
        />
      </div>
    </div>
  );
};

export default HomePage;
