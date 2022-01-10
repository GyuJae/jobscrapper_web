export const BASE_URL = "http://localhost:4000/";

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
    .catch((e) => alert(e));
