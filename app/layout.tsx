import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Alain Procs — Go-To-Market Engineer",
  description: "Production-grade GTM automations that replace a whole marketing team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-sora), sans-serif", backgroundColor: "#06060a", color: "#eeedf7" }}
      >
        {children}
      </body>
    </html>
  );
}
