import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Puissance 4",
  description: "Jeu de puissance 4",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
