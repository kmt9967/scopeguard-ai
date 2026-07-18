import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { AppHeader } from "@/components/app-header";
import { ProjectProvider } from "@/components/project-provider";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "ScopeGuard AI — Evidence-backed scope control", template: "%s | ScopeGuard AI" },
  description: "Turn scattered client instructions into an approved, evidence-backed delivery plan.",
  openGraph: { title: "ScopeGuard AI", description: "Evidence before execution.", images: [{ url: "/og.png", width: 1200, height: 630, alt: "ScopeGuard AI — Evidence before execution" }] },
  twitter: { card: "summary_large_image", title: "ScopeGuard AI", description: "Evidence before execution.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={manrope.variable}><body><ProjectProvider><AppHeader />{children}</ProjectProvider></body></html>;
}
