import { createContext } from "react";

import { BacklogInfo } from "@/app/_types/types";

type GameDetailContextProp = {
  currentGame: BacklogInfo;
  setCurrentGame: React.Dispatch<React.SetStateAction<BacklogInfo>>;
};

const HomePageContext = createContext<GameDetailContextProp | undefined>(
  undefined
);

export { HomePageContext };
