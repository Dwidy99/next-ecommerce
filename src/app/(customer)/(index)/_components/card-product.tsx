import { rupiahFormat } from "@/lib/utils";
import { TProduct } from "@/app/(customer)/types";
import Link from "next/link";

interface CardProductProps {
  item: TProduct;
}

export default function CardProduct({ item }: CardProductProps) {
  return (
    <Link
      href={`/detail-product/${item.id}`}
      className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC736] hover:shadow-md sm:p-5"
    >
      {/* 🖼️ Image */}
      <div className="flex h-[140px] w-full items-center justify-center overflow-hidden rounded-xl bg-[#FFF4CC] sm:h-[160px] md:h-[180px]">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 🧾 Info */}
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-sm sm:text-base text-[#110843] leading-snug line-clamp-2">
            {item.name}
          </p>
          <p className="text-xs sm:text-sm text-[#616369]">
            {item.category_name}
          </p>
        </div>

        <p className="mt-2 text-sm font-bold text-[#d99000] sm:text-base">
          {rupiahFormat(Number(item.price))}
        </p>
      </div>
    </Link>
  );
}
