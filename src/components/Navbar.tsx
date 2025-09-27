'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const Item = ({ to, label }: { to: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link
      href={to}
      className={`px-3 py-2 rounded-md text-sm md:text-base transition-colors ${
        isActive ? "bg-orion-panel text-orion-text" : "text-orion-sub hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
};

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-orion-border">
      <nav className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="font-black tracking-wide text-xl md:text-2xl text-orion-red">ORION</div>
        <div className="flex items-center gap-2 md:gap-3">
          <Item to="/onboarding" label="Onboarding" />
          <Item to="/dashboard" label="Dashboard" />
          <Item to="/life-os" label="Life OS" />
          <Item to="/orchestration" label="Orchestration" />
          <Item to="/control" label="Control" />
          <Item to="/vision" label="Vision" />
        </div>
      </nav>
    </header>
  );
}
