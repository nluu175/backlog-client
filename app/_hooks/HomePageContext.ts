import { createContext } from "react";

import { BacklogInfo } from "@/app/_types/types";

type CurrentGame = { steam_app_id: number; name: string };

type GameDetailContextProp = {
  currentGame: CurrentGame;
  setCurrentGame: React.Dispatch<React.SetStateAction<CurrentGame>>;
};

const HomePageContext = createContext<GameDetailContextProp | undefined>(
  undefined
);

export { HomePageContext };
