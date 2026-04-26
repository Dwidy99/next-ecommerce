import React from "react";
import type { NoDataProps } from "@/app/(customer)/types";

export default function NoData({
  title = "No Data Found",
  message = "Try adjusting your filters or search keywords.",
  icon = "/assets/icons/no-data.svg",
}: NoDataProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center w-full">
      <img
        src={icon}
        alt="No Data"
        className="w-28 h-28 sm:w-36 sm:h-36 mb-4 opacity-80"
      />
      <h3 className="text-base sm:text-lg font-semibold text-gray-700">
        {title}
      </h3>
        <p className="mt-1 max-w-xs text-sm text-gray-500 sm:max-w-none">
        {message}
      </p>
    </div>
  );
}
