// https://stackoverflow.com/questions/42233987/how-to-configure-custom-global-interfaces-d-ts-files-for-typescript

import { UUID } from "crypto";

type BacklogInfo = {
  id: string;
  name: string;
  status: number;
  rating: number;
  steam_app_id: number;
  comment: string;
  playtime: number; // in minutes
  favourite: boolean;
  completed: boolean;
};

export { BacklogInfo };
