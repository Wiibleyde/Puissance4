import { auth } from "@/auth";
import SignIn from "@/components/Auth/SignIn";
import { Navbar } from "@/components/Navbar/Navbar";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await auth()

    if (session) {
        redirect("/")
    }

    return (
        <div>
            <Navbar />
            <SignIn />
        </div>
    );
}

