import Image from "next/image";

import logo from "@/../public/logo-white.svg";

export default function CominSoonPage() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <Image src={logo} alt="Yarbz Digital logo" className="" />
      <p className="font-semibold text-[white] opacity-50 text-lg">Updates on the way!</p>
    </main>
  );
}
