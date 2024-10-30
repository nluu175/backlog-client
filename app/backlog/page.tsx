"use client";

import { useState } from "react";
import GameDetail from "@/app/_components/backlog/GameDetail";
import GameList from "@/app/_components/backlog/GameList";
import Header from "@/app/_components/layout/Header";
import { HomePageContext } from "@/app/_hooks/HomePageContext";

export default function Home() {
  const [currentGame, setCurrentGame] = useState({
    id: "",
    name: "",
    status: 0,
    rating: 0,
    // steam_app_id is default at -1, meaning it's not a valid steam app id and no game is currently set
    steam_app_id: -1,
    comment: "",
    playtime: 0,
    favourite: false,
    completed: false,
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
      </main>
    </HomePageContext.Provider>
  );
}
