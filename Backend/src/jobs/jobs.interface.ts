export interface JobData {
  jobId: string;
  createdAt?: Date;
  resolvedAt?: Date;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  result?: {
    id: string;
    slug: string;
    url: string;
  } | null;
}
