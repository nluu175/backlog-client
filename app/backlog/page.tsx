"use client";

import { useState } from "react";
import GameDetail from "@/app/_components/backlog/GameDetail";
import GameList from "@/app/_components/backlog/GameList";
import Header from "@/app/_components/layout/Header";
import { HomePageContext } from "@/app/_hooks/HomePageContext";

export default function Home() {
  const [currentGame, setCurrentGame] = useState({
    steam_app_id: 570,
    name: "Dota 2 (Default for Test)",
    playtime: 0,
    rating: 0,
    status: 0,
  });

  return (
    <HomePageContext.Provider value={{ currentGame, setCurrentGame }}>
      <main className="text-neutral-200 min-h-screen flex flex-col">
        <Header />

        {/* Game List Container */}
        <div className="w-full h-[calc(100vh-100px)] flex">
          <div className="w-full flex flex-row">
            <div className="w-[30%]">
              <GameDetail />
            </div>
            <div className="w-[70%]">
              <GameList />
            </div>
          </div>
        </div>

        <footer className="w-full">Footer</footer>
      </main>
    </HomePageContext.Provider>
  );
}