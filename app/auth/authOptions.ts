import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // OAuth Provider (e.g., Google)
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize (credentials, req) {

        if(!credentials?.email || !credentials?.password) {
            console.error("Email and Password are required");
            return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.password) {
            const isValidPassword = await bcrypt.compare(credentials.password, user.password);
  
            if (isValidPassword) {
              return user;
            } else {
                console.error("Invalid Credentials");
                return null;
            };
          } else {
            console.error("User not found");
            return null;
          }
        },
    }),
  ],
  session: {
    strategy: "jwt", // Using JWT for sessions
  },
  pages: {
    signIn: '/',
  },
};

export default authOptions;