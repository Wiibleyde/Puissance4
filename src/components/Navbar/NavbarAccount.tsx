import Image from "next/image";
import { BoxArrowRight } from "react-bootstrap-icons";
import DefaultAvatar from "../../../public/img/default-avatar.png";
import { signOut } from "@/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function NavbarAccount({ session }: { session: any }) {

    return (
        <div className="flex items-center">
            <Image src={session.data?.user?.image ?? DefaultAvatar} alt="avatar" width={50} height={50} />
            <p>{session.data?.user?.name}</p>
            <button onClick={() => signOut()}><BoxArrowRight /></button>
        </div>
    )
}
