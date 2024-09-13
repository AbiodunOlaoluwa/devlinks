import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

// Named export for the POST method
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Extract body from request
    const { userId, name, email, image } = body;

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    const exists = await prisma.sharable.findUnique({
        where: {id: userId},
    })

    if (exists) {
        // Update user profile in the database
        await prisma.sharable.update({
          where: { id: userId },
          data: { name, email, image },
        });
    }


    return NextResponse.json({ success: true, message: "Profile saved successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json({ success: false, message: "Error saving profile" }, { status: 500 });
  }
}
