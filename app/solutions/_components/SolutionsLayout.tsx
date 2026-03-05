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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">{mobileNav}</div>

      {/* Content: wider right padding creates breathing room before sidebar */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:pr-[280px]">
        {children}
      </div>

      {/* Fixed sidebar — tight to right edge, gap comes from content padding */}
      <div className="hidden lg:block">
        <div className="fixed right-[max(1rem,calc((100vw-80rem)/2+0.5rem))] top-24 w-[196px]">
          <div className="max-h-[calc(100vh-6rem)] overflow-auto pr-1">
            {sidebar}
          </div>
        </div>
      </div>
    </div>
  );
}
