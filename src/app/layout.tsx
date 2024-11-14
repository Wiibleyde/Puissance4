import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";

export const metadata: Metadata = {
  title: "Puissance 4",
  description: "Jeu de puissance 4",
};


export default function LocaleLayout({
  children,
  session
}: {
  children: React.ReactNode;
  session: Session | null;
}) {

  return (
    <html>
      <SessionProvider session={session}>
        <body>
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}