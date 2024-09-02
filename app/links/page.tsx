import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
import prisma from "@/prisma/db";

const LinksPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You must be logged in.</p>;
  }

  const userEmail = session.user.email;

  // Check that userEmail is not null or undefined
  if (!userEmail) {
    return <p>Invalid session. No email found.</p>;
  }

  // Await the user object from the database
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { email: userEmail }, // Now userEmail is guaranteed to be a string
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return <p>Error loading user data.</p>;
  }

  return (
    <div>
      <h1>LinksPage - Home</h1>
      <p>{user?.id}</p>
      <p>{user?.email}</p>
    </div>
  );
};

export default LinksPage;
