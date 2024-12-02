import { signIn } from "@/auth"
import { Discord } from "react-bootstrap-icons"

export default function SignInDiscord() {
    return (
        <form action={async () => {
                "use server"
                await signIn("discord")
            }}
        >
            <button 
                type="submit" 
                className="bg-discord hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-row items-center justify-center space-x-2 shadow-lg transition-transform transform hover:scale-105"
            >
                <Discord></Discord> <span>Connexion avec Discord</span>
            </button>
        </form>
    )
}