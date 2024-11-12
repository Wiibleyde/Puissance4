
import { signIn } from "@/auth"

export default function SignIn() {
    return (
        <form action={async () => {
                "use server"
                await signIn("discord")
            }}
        >
            <button type="submit" className="bg-[#5865F2] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Signin with Discord</button>
        </form>
    )
}