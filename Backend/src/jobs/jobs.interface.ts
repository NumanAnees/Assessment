export interface JobData {
  jobId: string;
  createdAt?: Date;
  resolvedAt?: Date | null;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  result?: {
    id: string;
    slug: string;
    url: string;
  } | null;
}
