import Link from "next/link";

export function NavbarSignIn() {
    return (
        <div className="flex items-center ml-4">
            <Link href="/login" className="text-yellow-500 hover:text-yellow-700 px-4 py-2 rounded-md border border-yellow-500 shadow-md transition duration-300 ease-in-out transform hover:scale-105">Sign In</Link>
        </div>
    )
}
