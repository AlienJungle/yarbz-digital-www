import HeaderNav from "@/components/header-nav";
import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/footer";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: "%s | Yarbz Digital",
    default: "👨🏻‍💻 Aaron Yarborough - Freelance Software Consultant | Yarbz Digital",
  },
  description: "With over a decade of expertise, I transform businesses and their clients into digital success stories by crafting elegant, efficient, and cost-effective web and mobile solutions.",
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
