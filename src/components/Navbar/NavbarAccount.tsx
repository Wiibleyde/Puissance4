import Image from "next/image";
import DefaultAvatar from "../../../public/img/default-avatar.png";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { CaretDown } from "react-bootstrap-icons";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function NavbarAccount({ session }: { session: any }) {
    const [submenuDeployed, setSubmenuDeployed] = useState(false)

    return (
        <div className="relative ml-4">
            <button className="flex items-center space-x-4 bg-yellow-700 p-2 rounded-md hover:bg-yellow-600 focus:outline-none shadow-md transition duration-300 ease-in-out transform hover:scale-105" onClick={() => setSubmenuDeployed(!submenuDeployed)}>
                <Image src={session.data?.user?.image ?? DefaultAvatar} alt="avatar" width={50} height={50} className="rounded-full border-2 border-yellow-500" />
                <p className="text-lg text-yellow-500">{session.data?.user?.name}</p>
                <div>
                    <CaretDown className={`w-5 h-5 text-yellow-500 transition-transform ${submenuDeployed ? 'rotate-180' : ''}`} />
                </div>
            </button>
            {submenuDeployed && (
                <div className="absolute right-0 mt-2 w-full bg-yellow-700 rounded-md shadow-lg z-10">
                    <button onClick={() => signOut()} className="block px-4 py-2 text-yellow-500 hover:bg-yellow-600 hover:text-yellow-700 transition duration-300 ease-in-out transform hover:scale-105">Sign Out</button>
                </div>
            )}
        </div>
    )
}
