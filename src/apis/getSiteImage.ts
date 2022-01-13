import { BASE_URL } from "./getJobs";

interface ISiteImage {
  site: string;
  url: string;
}

export interface IGetSitesImageResult {
  ok: boolean;
  error: string | null;
  sites: ISiteImage[];
}

export const getSitesImage = () =>
  fetch(BASE_URL + "sites/images")
    .then((res) => res.json())
    .catch((e) => {
      throw new Error(e);
    });
