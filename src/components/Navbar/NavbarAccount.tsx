import Image from "next/image";
import { BoxArrowRight } from "react-bootstrap-icons";
import DefaultAvatar from "../../../public/img/default-avatar.png";
import { signOut } from "next-auth/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function NavbarAccount({ session }: { session: any }) {
    const handleSignOut = () => {
        signOut();
    }
    return (
        <div className="flex items-center space-x-4">
            <Image src={session.data?.user?.image ?? DefaultAvatar} alt="avatar" width={40} height={40} className="rounded-full" />
            <p className="text-white">{session.data?.user?.name}</p>
            <button onClick={handleSignOut} className="text-white hover:text-gray-300 transition-colors duration-300">
                <BoxArrowRight size={20} />
            </button>
        </div>
    )
}
