import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { LinkObject } from "@/app/links/LinkContext";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const requestEmail = searchParams.get("email");

  if (!requestEmail) {
    return NextResponse.json({ error: "User Email is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: requestEmail },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const sharableData = await prisma.sharable.findUnique({
      where: { userId: user.id },
    });

    const id: string = sharableData?.id ?? user.id ?? "";
    const name: string = sharableData?.name ?? user.name ?? "";
    const email: string = sharableData?.email ?? user.email ?? "";
    const image: string = sharableData?.image ?? user.image ?? "";
    const createLinkObjects: LinkObject[] = sharableData?.createLinkObjects as LinkObject[] ?? [];

    return NextResponse.json({
      id,
      name,
      email,
      image,
      createLinkObjects,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
  }
}
