import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  actions?: ReactNode;
}

export default function Card({ title, subtitle, children, actions }: CardProps) {
  return (
    <div className="card w-[280px] sm:w-[320px] shrink-0">
      <div className="h-32 rounded-lg bg-orion-red/10 mb-3" />
      <h3 className="font-bold">{title}</h3>
      {subtitle && <p className="text-sm text-orion-sub mt-1">{subtitle}</p>}
      {children}
      {actions && <div className="mt-3 flex gap-2">{actions}</div>}
    </div>
  );
}
