import { createContext } from "react";

import { BacklogInfo } from "@/app/_types/types";

type CurrentGame = { steam_app_id: number; name: string };

type GameDetailContextProp = {
  currentGame: BacklogInfo;
  setCurrentGame: React.Dispatch<React.SetStateAction<BacklogInfo>>;
};

const HomePageContext = createContext<GameDetailContextProp | undefined>(
  undefined
);

export { HomePageContext };
