import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import prisma from '@/prisma/db';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body as JSON
    const { email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });


    return NextResponse.json({ message: 'User created', user }, { status: 201 });
  } catch (error) {
    console.log({error})
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Handling unsupported HTTP methods
export async function OPTIONS() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
