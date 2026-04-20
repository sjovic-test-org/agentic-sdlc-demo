import { createTask, completeTask, getTasks, resetTasks } from "../lib/taskService";

beforeEach(() => {
  resetTasks();
});

describe("taskService", () => {
  it("should create a task with the given title", () => {
    const task = createTask("Write tests");
    expect(task.title).toBe("Write tests");
    expect(task.completed).toBe(false);
    expect(task.id).toBeDefined();
  });

  it("should add the task to the list", () => {
    createTask("First task");
    createTask("Second task");
    expect(getTasks()).toHaveLength(2);
  });

  it("should mark a task as completed", () => {
    const task = createTask("Complete me");
    const updated = completeTask(task.id);
    expect(updated).not.toBeNull();
    expect(updated!.completed).toBe(true);
  });

  it("should return null when completing a non-existent task", () => {
    const result = completeTask("nonexistent-id");
    expect(result).toBeNull();
  });
});
