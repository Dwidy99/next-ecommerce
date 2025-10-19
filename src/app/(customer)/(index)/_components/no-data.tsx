export default function NoData() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <img
        src="/assets/icons/empty-cart.svg"
        alt="No data"
        className="w-[160px] sm:w-[220px] mb-6"
      />
      <h3 className="font-semibold text-lg text-[#110843] mb-2">
        No Products Found
      </h3>
      <p className="text-sm sm:text-base text-gray-500">
        Try browsing other categories or check back later.
      </p>
    </div>
  );
}
