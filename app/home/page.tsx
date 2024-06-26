"use client";

import Link from "next/link";

import { useState, useEffect } from "react";

import GameDetail from "@/components/home/GameDetail";
import GameList from "@/components/home/GameList";

type GameInfo = {
  name: string;
  // genre: string;
};

export default function Home() {
  const [currentGame, setCurrentGame] = useState({
    name: "default",
  });

  // NOTE: Use SWR for data fetching
  // Source: https://swr.vercel.app/

  return (
    <main
      className="text-neutral-200 min-screen
                  relative
                  flex flex-col
                  items-center"
    >
      {/* <main className="test"> */}
      {/* Header */}
      <nav className="bg-steam-header w-full h-[100px] flex flex-row justify-between pl-5 pr-5">
        <div className="mt-5 ml-6">Logo</div>
        <div className="font-semibold text-2xl mt-7 w-90 p-2">
          <Link href="/home" className="mr-4 hover:text-neutral-500">
            Home
          </Link>
          <button className="mr-4 hover:text-neutral-500">Community</button>
          <button className="mr-4 hover:text-neutral-500">About</button>
          <button className="hover:text-neutral-500">Profile</button>
        </div>
        <div className="mt-3">
          <button className="ml-1 mr-6 text-sm pt-1 pb-1 pl-2 pr-2 hover:text-neutral-500">
            sign out
          </button>
        </div>
      </nav>

      {/* Game List */}
      <div className="w-full h-[calc(100vh-100px)] flex flex-row">
        <GameDetail currentGame={currentGame} />
        <GameList setCurrentGame={setCurrentGame} />
      </div>

      <footer className="w-full">Footer</footer>
    </main>
  );
}
