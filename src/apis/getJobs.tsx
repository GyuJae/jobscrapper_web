export const BASE_URL = "https://job-scrapper-backend.herokuapp.com/";

export interface JobType {
  id: string;
  title: string;
  company: string;
  condition: string;
  url: string;
  site: string;
}

interface JobObj {
  [key: string]: JobType[];
}

export interface JobResult {
  jobs: JobObj;
  success: boolean;
  totalJobs: number;
  error: string | null;
}
export const getJobs = (keyword: string) =>
  fetch(BASE_URL + keyword)
    .then((res) => res.json())
    .catch((e) => {
      throw new Error(e);
    });
