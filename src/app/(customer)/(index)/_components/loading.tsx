"use client";
import React from "react";

export default function Loading() {
  return (
    <div id="categories" className="flex flex-col gap-[30px] animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-[34px] w-[200px] bg-gray-200 rounded"></div>
        <div className="h-[44px] w-[120px] bg-gray-200 rounded-full"></div>
      </div>
      <div className="grid grid-cols-4 gap-[30px]">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white flex items-center gap-[14px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] w-full"
          >
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div className="flex flex-col gap-[6px] w-full">
              <div className="h-[20px] w-[80%] bg-gray-300 rounded"></div>
              <div className="h-[16px] w-[60%] bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
