"use client"
import { useSession } from "next-auth/react";
import { NavbarAccount } from "./NavbarAccount";
import { NavbarSignIn } from "./NavbarSignIn";
import { Logo } from "../Vect/Logo";
import Link from "next/link";

export function Navbar() {
    const session = useSession()

    return (
        <div className="flex justify-between items-center bg-yellow-800 text-white p-4 shadow-lg">
            <Link className="flex items-center" href="/">
                <Logo />
            </Link>
            <div className="flex items-center space-x-4">
                {session.data ? <NavbarAccount session={session} /> : <NavbarSignIn />}
            </div>
        </div>
    )
}

