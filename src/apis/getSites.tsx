import { BASE_URL } from "./getJobs";

export const getSites = () =>
  fetch(BASE_URL + "sites")
    .then((res) => res.json())
    .catch((e) => {
      throw new Error(e);
    });
