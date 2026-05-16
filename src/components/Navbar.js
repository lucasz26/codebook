"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import UserMenu from "@/components/logincomponents/UserMenu";
import { SessionProvider } from "next-auth/react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/problems-library", label: "Browse Problems" },
  { href: "/publish", label: "Publish" },
  { href: "/profile", label: "Account" },
  { href: "/login", label: "Login" }, // Likely temporary, I have to figure out a way to fix this.
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="nav">
      <Link href="/" className="logo">
        CodeBook
      </Link>
      <ul className="nav-links">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={pathname === href ? "active" : ""}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    
    {/* When we wnat to use Sessions, we need Session Provider. But I think we could move this??? */}
    <SessionProvider>
        <UserMenu></UserMenu>
    </SessionProvider>
    </nav>
  );
}
