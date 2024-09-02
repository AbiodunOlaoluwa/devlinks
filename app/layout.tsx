import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import AuthProvider from "@/app/auth/Provider";
import "./globals.css";

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "devlinks",
  description: "Link Sharing app by @_solodev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider >
      <body className={instrumentSans.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
