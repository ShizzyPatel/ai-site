"use client";

import React from "react";

type SolutionsLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  mobileNav: React.ReactNode;
};

export default function SolutionsLayout({ children, sidebar, mobileNav }: SolutionsLayoutProps) {
  return (
    <div className="relative">
      {/* Mobile nav pills */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">{mobileNav}</div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 items-start">
          {/* Left content */}
          <div>{children}</div>

          {/* Right placeholder column (keeps grid spacing) */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* FIXED sidebar overlay (not affected by sticky blockers) */}
      <div className="hidden lg:block">
        <div className="fixed right-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] top-24 w-[280px]">
          <div className="max-h-[calc(100vh-6rem)] overflow-auto pr-2">
            {sidebar}
          </div>
        </div>
      </div>
    </div>
  );
}