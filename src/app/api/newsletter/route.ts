import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    await prisma.newsletter.upsert({
      where: { email },
      update: { active: true },
      create: { email },
    });

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch {
    return NextResponse.json({ message: "Subscribed successfully" });
  }
}
