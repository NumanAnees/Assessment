export interface JobData {
  jobId: string;
  createdAt?: Date;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  resolvedAt?: Date | undefined;
  result?:
    | {
        id: string;
        slug: string;
        url: string;
      }
    | undefined
    | null;
}
