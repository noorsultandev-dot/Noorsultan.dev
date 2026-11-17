import type { ReactNode } from "react";

/** macOS-style window title bar used by editor and terminal panels. */
export default function WindowChrome({
  title,
  right,
  children,
  className = "",
  variant = "panel",
}: {
  title: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  variant?: "panel" | "holo";
}) {
  return (
    <div className={`${variant} overflow-hidden rounded-xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/5 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-[11px] text-slate-400">{title}</span>
        {right && <span className="ml-auto">{right}</span>}
      </div>
      {children}
    </div>
  );
}
