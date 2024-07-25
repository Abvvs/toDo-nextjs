import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const task = await prisma.tasks.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  return NextResponse.json(task);
}
export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const actualTask = await prisma.tasks.update({
            where: {
                id: parseInt(params.id),
            },
            data: data,
        });
        return NextResponse.json(actualTask);
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
  //return NextResponse.json("PUT tareas" + params.id);
}
export async function DELETE(request, { params }) {
  try {
    const taskRemoved = await prisma.tasks.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(taskRemoved);
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
