import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
// import { LinkObject } from "@/app/links/LinkContext";

// Named export for the POST method
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Extract body from request
    const { userId, createLinkObjects } = body;

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    const exists = await prisma.sharable.findUnique(
        {
            where: {id: userId}
        }
    )

    if (exists) {
        // Update user links in the database
        await prisma.sharable.update({
          where: { id: userId },
          data: { createLinkObjects },
        });
    } else {
        await prisma.sharable.create({
            data: {userId, createLinkObjects}
        })
    }


    return NextResponse.json({ success: true, message: "Links saved successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving links:", error);
    return NextResponse.json({ success: false, message: "Error saving links" }, { status: 500 });
  }
}

