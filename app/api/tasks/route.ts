import { NextResponse } from "next/server";
import { getTasks, createTask, completeTask } from "@/lib/taskService";

export async function GET() {
  return NextResponse.json(getTasks());
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title } = body;
  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const task = createTask(title);
  return NextResponse.json(task, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id } = body;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Id is required" }, { status: 400 });
  }
  const task = completeTask(id);
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json(task);
}
