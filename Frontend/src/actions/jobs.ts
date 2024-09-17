export const fetchJobs = async (): Promise<any> => {
  const response = await fetch(`http://localhost:4000/jobs`);
  const result: any = await response.json();
  return result;
};
