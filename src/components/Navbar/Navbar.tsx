"use client"
import { useSession } from "next-auth/react";
import { NavbarAccount } from "./NavbarAccount";
import { NavbarSignIn } from "./NavbarSignIn";
import { Logo } from "../Vect/Logo";
import Link from "next/link";

export function Navbar() {
    const session = useSession()

    return (
        <div className="flex justify-between p-4 bg-gray-800 w-full shadow-md">
            <div>
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <div className="flex space-x-4">
                <Link href="/game/ia" className="text-white bg-gray-900 p-3 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center transition duration-300">
                    <p className="text-white">Jouer contre l&apos;IA</p>
                </Link>
                <Link href="/game/online" className="text-white bg-gray-900 p-3 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center transition duration-300">
                    <p className="text-white">Jouer en ligne</p>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                {session.data ? <NavbarAccount session={session} /> : <NavbarSignIn />}
            </div>
        </div>
    )
}

