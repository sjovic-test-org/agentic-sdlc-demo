"use client";

import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Health {
  status: "ok" | "degraded";
  failedTasks: number;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [health, setHealth] = useState<Health | null>(null);
  const [newTitle, setNewTitle] = useState("");

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  }

  async function fetchHealth() {
    const res = await fetch("/api/health");
    const data = await res.json();
    setHealth(data);
  }

  useEffect(() => {
    fetchTasks();
    fetchHealth();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });
    setNewTitle("");
    await fetchTasks();
    await fetchHealth();
  }

  async function handleComplete(id: string) {
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchTasks();
    await fetchHealth();
  }

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>TaskPulse</h1>

      {health && (
        <div
          style={{
            padding: "8px 12px",
            marginBottom: 20,
            background: health.status === "ok" ? "#d4edda" : "#f8d7da",
            border: `1px solid ${health.status === "ok" ? "#c3e6cb" : "#f5c6cb"}`,
            borderRadius: 4,
          }}
        >
          System status: <strong>{health.status}</strong> — failed tasks: {health.failedTasks}
        </div>
      )}

      <form onSubmit={handleCreate} style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task title"
          style={{ flex: 1, padding: "6px 10px" }}
        />
        <button type="submit" style={{ padding: "6px 16px" }}>
          Add Task
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 0",
              borderBottom: "1px solid #eee",
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "#888" : "#000",
            }}
          >
            <span style={{ flex: 1 }}>{task.title}</span>
            {!task.completed && (
              <button onClick={() => handleComplete(task.id)} style={{ padding: "4px 10px" }}>
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
