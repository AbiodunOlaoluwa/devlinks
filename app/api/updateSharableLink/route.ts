import { NextResponse } from "next/server";
import prisma from "@/prisma/db";

export async function POST (request: Request) {
    try {
        const { sharableId, newLinkId } = await request.json();

        if (!sharableId || !newLinkId) {
            return NextResponse.json({ status: 400, error: "Missing parameters." });
          }
      
          // Check if `newLinkId` is already in use
          const idInUse = await prisma.sharable.findUnique({
            where: { id: newLinkId },
          });
      
          if (idInUse) {
            return NextResponse.json({ status: 400, error: "Link ID is already in use." });
          }

        const updatedLink = await prisma.sharable.update({
            where: {id: sharableId},
            data: {id: newLinkId}
        });

        return NextResponse.json({success: true, updatedLink});
    } catch (error) {
        return NextResponse.json({error: "Failed to update Link."}, {status: 500});
    }
}