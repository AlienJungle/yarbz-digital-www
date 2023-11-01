import type { Metadata } from "next";
import "../globals.css";

import Footer from "@/components/footer";
import HeaderNav from "@/components/tutoring/header-nav";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: "%s | Yarbz Tutoring",
    default: "Expert tutoring from a software professional | Yarbz Tutoring",
  },
  description: "I help people learn software development, no matter where they're starting from.",
};

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <>
          <HeaderNav />
          {children}
          <Footer />
        </>
      </body>
    </html>
  );
}
