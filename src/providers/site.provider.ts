import { atom } from "recoil";

interface ISiteState {
  site: string;
  page: number;
}

export const siteState = atom<ISiteState>({
  key: "siteState",
  default: { site: "indeed", page: 0 },
});
