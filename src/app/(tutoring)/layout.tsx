import type { Metadata } from "next";
import "../globals.css";

import UserProvider from "@/components/providers/user-provider";
import Footer from "@/components/tutoring/footer";
import HeaderNav from "@/components/tutoring/header-nav";
import { useServerAuth } from "@/lib/useServerAuth";
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { getCurrentUser } = useServerAuth();

  const currentUser = await getCurrentUser();
  return (
    <html lang="en" className={poppins.className}>
      <body className="tutoring flex flex-col min-h-[100vh]">
        <>
          <UserProvider currentUser={currentUser}>
            <HeaderNav user={currentUser} />
            <div className="flex flex-col flex-grow">{children}</div>
            <Footer />
          </UserProvider>
        </>
      </body>
    </html>
  );
}
