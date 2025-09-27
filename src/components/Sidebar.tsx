'use client';
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SidebarProps {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}

export default function Sidebar({ open, children, onClose }: SidebarProps) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} aria-hidden="true"></div>}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: open ? 0 : -320 }}
        transition={{ type: "tween", duration: 0.25 }}
        className="fixed z-50 top-0 left-0 h-full w-72 bg-orion-panel border-r border-orion-border p-4 overflow-y-auto"
      >
        {children}
      </motion.aside>
    </>
  );
}
