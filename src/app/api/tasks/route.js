import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const tasks = await prisma.tasks.findMany();
  console.log(tasks);
  return NextResponse.json(tasks);
}
export async function POST(request) {
  const { title, description, completed } = await request.json();
  const newTask = await prisma.tasks.create({
    data: {
      title,
      description,
      completed,
    },
  });
  return NextResponse.json(newTask);
}
