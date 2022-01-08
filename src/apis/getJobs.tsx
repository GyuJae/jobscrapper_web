export const BASE_URL = "http://localhost:4000/";

export interface JobType {
  id: string;
  title: string;
  company: string;
  condition: string;
  url: string;
  site: string;
}

export interface JobResult {
  jobs: JobType[];
  success: boolean;
}
export const getJobs = (keyword: string) =>
  fetch(BASE_URL + keyword)
    .then((res) => res.json())
    .catch((e) => alert(e));
