"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/assignments", label: "Assignments" },
    ...(session?.user?.role === "INSTRUCTOR"
      ? [
          { href: "/assignments/create", label: "Create Assignment" },
          { href: "/dashboard", label: "Dashboard" },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between h-14 max-w-7xl px-4">
        <div className="flex items-center">
          <Link href="/" className="">
            <Image
              src="/Evalio.png"
              alt="AssignHub Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        <nav className="items-center hidden space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors text-foreground/60 hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <div className="hidden md:flex">
            {status === "authenticated" ? (
              <Button onClick={() => signOut({ callbackUrl: '/' })}>
                Sign Out
              </Button>
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white dark:bg-slate-950 p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                     <Link href="/" className="" onClick={() => setIsMobileMenuOpen(false)}>
                        <Image src="/Evalio.png" alt="AssignHub Logo" width={100} height={100}/>
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-6 text-lg font-medium">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="transition-colors text-foreground/60 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                   <div className="mt-auto">
                    {status === "authenticated" && (
                       <Button onClick={() => {
                           setIsMobileMenuOpen(false);
                           signOut({ callbackUrl: '/' });
                        }} className="w-full">
                         Sign Out
                       </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}