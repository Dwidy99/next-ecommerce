import React from "react";

export default function FilterBrand() {
  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Brands</p>
      <label className="font-semibold flex items-center gap-3">
        <input
          type="checkbox"
          name="brand"
          className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
        />
        <span>Apple</span>
      </label>
      <label className="font-semibold flex items-center gap-3">
        <input
          type="checkbox"
          name="brand"
          className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
        />
        <span>Samsung</span>
      </label>
      <label className="font-semibold flex items-center gap-3">
        <input
          type="checkbox"
          name="brand"
          className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
        />
        <span>Huawei</span>
      </label>
      <label className="font-semibold flex items-center gap-3">
        <input
          type="checkbox"
          name="brand"
          className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
        />
        <span>Nokia</span>
      </label>
      <label className="font-semibold flex items-center gap-3">
        <input
          type="checkbox"
          name="brand"
          className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
        />
        <span>Microsoft</span>
      </label>
    </div>
  );
}
