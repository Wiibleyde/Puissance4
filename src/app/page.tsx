import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/login" className="text-blue-500">Login</Link>
      <h1 className="text-4xl text-center p-4">Welcome to Power 4 !</h1>
    </div>
  );
}
