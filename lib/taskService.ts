export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

let tasks: Task[] = [];

export function getTasks(): Task[] {
  return tasks;
}

export function createTask(title: string): Task {
  const task: Task = {
    id: Math.random().toString(36).substr(2, 9),
    title,
    completed: false,
  };
  tasks.push(task);
  return task;
}

export function completeTask(id: string): Task | null {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  task.completed = true;
  return task;
}

export function resetTasks(): void {
  tasks = [];
}
