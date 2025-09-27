'use client';
import { useEffect, useState, type ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import { useOrionState } from '@/hooks/useOrionState';

function Footer() {
  const [year, setYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  
  return (
    <footer className="mt-16 border-t border-orion-border/70">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 text-sm text-orion-sub flex flex-wrap items-center justify-between">
        <span>© {year} Project Orion</span>
        <span>Cinematic dark UI • Multimodal • Explainable • Responsive</span>
      </div>
    </footer>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const key = 'orion_sim_v2';
    try {
      const storedState = localStorage.getItem(key);
      if (storedState) {
        useOrionState.setState(JSON.parse(storedState));
      }
    } catch (e) {
      console.error('Could not load state from localStorage', e);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
