"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["/new", "New analysis"],
  ["/analysis", "Workspace"],
  ["/review", "Review"],
  ["/export", "Export"],
  ["/methodology", "Methodology"],
];

export function AppHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand" aria-label="ScopeGuard AI home">
          <span className="brand-mark"><ShieldCheck size={19} /></span>
          <span>ScopeGuard <b>AI</b></span>
        </Link>
        <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
          {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={pathname === href ? "active" : ""}>{label}</Link>)}
        </nav>
        <Link href="/new" className="button button-dark desktop-cta">Start analysis</Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}
