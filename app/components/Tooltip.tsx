"use client";

import { useId, useState } from "react";

type TooltipProps = {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom";
};

export default function Tooltip({ label, children, side = "top" }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  const position =
    side === "top"
      ? "bottom-full mb-2"
      : "top-full mt-2";

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={id} tabIndex={0} className="outline-none">
        {children}
      </span>

      <span
        id={id}
        role="tooltip"
        className={[
          "pointer-events-none absolute left-1/2 -translate-x-1/2",
          position,
          "whitespace-nowrap rounded-xl border border-gray-100 bg-white px-3 py-2 text-xs text-gray-700 shadow-md",
          "transition",
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
        ].join(" ")}
      >
        {label}
      </span>
    </span>
  );
}