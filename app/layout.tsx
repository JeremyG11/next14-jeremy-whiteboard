import type { Metadata } from "next";
import { Inter, Montserrat, Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Headers/Navbar";

const inter = Inter({ subsets: ["cyrillic"] });
const font = Work_Sans({
  subsets: [],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const monst = Montserrat({ subsets: ["cyrillic-ext"] });
export const metadata: Metadata = {
  title: "Liveblock with Next.js",
  description: "Learn liveblock collaboration tool with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
