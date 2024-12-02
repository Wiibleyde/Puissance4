import { Navbar } from "@/components/Navbar/Navbar";
import { Logo } from "@/components/Vect/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="bg-gray-900 text-white flex flex-col items-center justify-center h-full relative">
        <h1 className="text-4xl text-center p-4">Welcome to Power 4 !</h1>
        <div className="my-5">
          <Logo />
        </div>
        <div className="flex space-x-4">
          <Link href="/game/ia" className="text-white bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-500 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center transition duration-300">
              <p className="text-white">Jouer contre l&apos;IA</p>
          </Link>
          <Link href="/game/online" className="text-white bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-500 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center transition duration-300">
              <p className="text-white">Jouer en ligne</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
