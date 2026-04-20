import { Task } from "./taskService";

export interface HealthStatus {
  status: "ok" | "degraded";
  failedTasks: number;
}

export function getHealth(tasks: Task[]): HealthStatus {
  const failedTasks = tasks.filter((t) => t.completed).length;
  const status = failedTasks === 0 ? "ok" : "degraded";
  return { status, failedTasks };
}
