"use client";

import React from "react";

type AboutLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  mobileNav: React.ReactNode;
};

export default function AboutLayout({ children, sidebar, mobileNav }: AboutLayoutProps) {
  return (
    <div className="relative">
      {/* Mobile nav */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">{mobileNav}</div>

      {/* Content: reserve fixed sidebar space */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:pr-[360px]">
        {children}
      </div>

      {/* Fixed sidebar */}
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