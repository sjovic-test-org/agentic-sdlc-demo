import { getHealth } from "../lib/healthService";
import { Task } from "../lib/taskService";

describe("healthService", () => {
  it("should return ok when there are no tasks", () => {
    const result = getHealth([]);
    expect(result.status).toBe("ok");
    expect(result.failedTasks).toBe(0);
  });

  it("should return ok when all tasks are completed", () => {
    const tasks: Task[] = [
      { id: "1", title: "Task 1", completed: true },
      { id: "2", title: "Task 2", completed: true },
    ];
    const result = getHealth(tasks);
    expect(result.status).toBe("ok");
    expect(result.failedTasks).toBe(0);
  });

  it("should return degraded when some tasks are not completed", () => {
    const tasks: Task[] = [
      { id: "1", title: "Task 1", completed: false },
      { id: "2", title: "Task 2", completed: true },
    ];
    const result = getHealth(tasks);
    expect(result.status).toBe("degraded");
    expect(result.failedTasks).toBe(1);
  });
});
