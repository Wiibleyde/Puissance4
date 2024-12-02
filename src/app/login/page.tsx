import { auth } from "@/auth";
import SignInDiscord from "@/components/Auth/SignIn";
import { Navbar } from "@/components/Navbar/Navbar";
import { Logo } from "@/components/Vect/Logo";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await auth()

    if (session) {
        redirect("/")
    }

    return (
        <div className="h-screen overflow-hidden">
            <Navbar />
            <div className="bg-gray-900 text-white flex flex-col items-center justify-center h-full relative">
                <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
                    <span className="flex flex-row text-4xl font-bold">Connexion sur <Logo /></span>
                    <div className="flex flex-row justify-center mt-4">
                        <SignInDiscord />
                    </div>
                </div>
            </div>
        </div>
    );
}

