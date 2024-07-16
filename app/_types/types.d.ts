// https://stackoverflow.com/questions/42233987/how-to-configure-custom-global-interfaces-d-ts-files-for-typescript

import { UUID } from "crypto";

type BacklogInfo = {
  id?: UUID;
  name: string;
  steam_app_id: number;
};

export { BacklogInfo };
