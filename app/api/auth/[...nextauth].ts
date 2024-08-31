import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
const saltRounds = 10

export default NextAuth({
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
      async authorize(credentials, req) {
        // Custom user authentication logic



        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user && user.password && credentials?.password) {
            const isValidPassword = await bcrypt.compare(credentials.password, user.password);
  
            if (isValidPassword) {
              return user;
            }
          }
  
          throw new Error("Invalid credentials");
        },
    }),
  ],
  session: {
    strategy: "jwt", // Using JWT for sessions
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string; // Cast token id to string
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/', // Custom login page
    newUser: '/createaccount', // Custom create account page
  },
  secret: process.env.NEXTAUTH_SECRET,
});
