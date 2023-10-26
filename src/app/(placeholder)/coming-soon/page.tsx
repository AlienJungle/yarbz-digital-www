import Image from "next/image";

import logo from "@/../public/logo.svg";

export default function CominSoonPage() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <Image src={logo} alt="Yarbz Digital logo" className="w-[15%]" />
      <p className="font-semibold">A new brand is on its way...</p>
    </main>
  );
}
