"use client"
import { useSession } from "next-auth/react";
import { NavbarAccount } from "./NavbarAccount";
import { NavbarSignIn } from "./NavbarSignIn";

export function Navbar() {
    const session = useSession()

    return (
        <div className="flex justify-end p-4">
            {session.data ? <NavbarAccount session={session} /> : <NavbarSignIn />}
        </div>
    )
}

