export type RunStatus = "QUEUED" | "RUNNING" | "SUCCEEDED" | "FAILED";
export type RunStatusFilter = "all" | "queued" | "running" | "succeeded" | "failed" | "dev";

export type Run = {
  id: string;
  task: string;
  repository: string;
  status: RunStatus;
  statusLabel: string;
  agent: string;
  branch: string;
  startedAt: string;
};