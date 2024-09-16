export interface JobData {
  jobId: string;
  createdAt?: Date;
  resolvedAt?: Date;
  status: "pending" | "completed" | "failed";
  result?: {
    id: string;
    slug: string;
    urls: {
      full: string;
      regular: string;
      small: string;
    };
  } | null;
}
