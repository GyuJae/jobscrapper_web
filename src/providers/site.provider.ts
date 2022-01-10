import { atom } from "recoil";

export const siteState = atom<string>({
  key: "siteState",
  default: "사람인",
});
