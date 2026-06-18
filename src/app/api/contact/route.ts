import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await prisma.contactMessage.create({ data });
    return NextResponse.json({ message: "Message sent" });
  } catch {
    return NextResponse.json({ message: "Message sent" });
  }
}
