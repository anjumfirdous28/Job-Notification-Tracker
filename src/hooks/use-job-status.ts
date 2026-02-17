import { useState, useEffect, useCallback } from "react";

export type JobStatus = "Not Applied" | "Applied" | "Rejected" | "Selected";

export interface StatusChange {
  jobId: number;
  status: JobStatus;
  date: string; // ISO string
}

const STATUS_KEY = "jobTrackerStatus";
const CHANGES_KEY = "jobTrackerStatusChanges";

export const allStatuses: JobStatus[] = ["Not Applied", "Applied", "Rejected", "Selected"];

export const statusColor: Record<JobStatus, string> = {
  "Not Applied": "text-muted-foreground border-border",
  Applied: "text-blue-600 border-blue-300 bg-blue-50",
  Rejected: "text-destructive border-destructive/30 bg-destructive/10",
  Selected: "text-success border-success/30 bg-success/10",
};

export const useJobStatus = () => {
  const [statuses, setStatuses] = useState<Record<number, JobStatus>>(() => {
    try {
      const stored = localStorage.getItem(STATUS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [changes, setChanges] = useState<StatusChange[]>(() => {
    try {
      const stored = localStorage.getItem(CHANGES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
  }, [statuses]);

  useEffect(() => {
    localStorage.setItem(CHANGES_KEY, JSON.stringify(changes));
  }, [changes]);

  const getStatus = useCallback(
    (jobId: number): JobStatus => statuses[jobId] || "Not Applied",
    [statuses]
  );

  const setStatus = useCallback((jobId: number, status: JobStatus) => {
    setStatuses((prev) => ({ ...prev, [jobId]: status }));
    setChanges((prev) => [
      { jobId, status, date: new Date().toISOString() },
      ...prev,
    ].slice(0, 50)); // keep last 50
  }, []);

  return { getStatus, setStatus, changes };
};
