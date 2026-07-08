import type { ReactNode } from "react";
import { cn } from "./utils";

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div className={cn("rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center", className)}>
      {icon ? <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">{icon}</div> : null}
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
