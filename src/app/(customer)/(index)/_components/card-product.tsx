import { rupiahFormat } from "@/lib/utils";
import { TProduct } from "@/types";
import Link from "next/link";

interface CardProductProps {
  item: TProduct;
}

export default function CardProduct({ item }: CardProductProps) {
  return (
    <Link
      href={`/detail-product/${item.id}`}
      className="group bg-white flex flex-col gap-4 p-4 sm:p-5 rounded-2xl border border-[#E5E5E5] hover:border-[#FFC736] hover:shadow-md transition-all duration-300"
    >
      {/* 🖼️ Image */}
      <div className="w-full h-[140px] sm:h-[160px] md:h-[180px] flex items-center justify-center overflow-hidden rounded-xl bg-[#FAFAFA]">
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

        <p className="font-bold text-sm sm:text-base text-[#12007a] mt-2">
          {rupiahFormat(Number(item.price))}
        </p>
      </div>
    </Link>
  );
}
