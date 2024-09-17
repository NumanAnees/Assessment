export interface JobData {
  jobId: string;
  createdAt?: Date;
  resolvedAt?: Date;
  status: 'pending' | 'completed' | 'failed';
  result?: {
    id: string;
    slug: string;
    url: string;
  } | null;
}
