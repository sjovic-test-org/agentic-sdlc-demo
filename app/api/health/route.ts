import { NextResponse } from "next/server";
import { getTasks } from "@/lib/taskService";
import { getHealth } from "@/lib/healthService";

export async function GET() {
  const tasks = getTasks();
  const health = getHealth(tasks);
  return NextResponse.json(health);
}
