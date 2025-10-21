"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
}

export default function FilterGroup({ title, children }: FilterGroupProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-[#E5E5E5] pb-4 last:border-none">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full font-semibold text-left text-base md:text-lg"
      >
        {title}
        <ChevronDown
          className={`size-5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] mt-3" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
