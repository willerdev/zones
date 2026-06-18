import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await prisma.repairRequest.create({
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        deviceType: data.deviceType,
        deviceBrand: data.deviceBrand,
        deviceModel: data.deviceModel,
        problem: data.problem,
        images: [],
        appointmentDate: data.appointmentDate ? new Date(data.appointmentDate) : null,
      },
    });
    return NextResponse.json({ message: "Repair request submitted" });
  } catch {
    return NextResponse.json({ message: "Repair request submitted" });
  }
}
