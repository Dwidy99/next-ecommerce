import React from "react";
import CardProduct from "../../_components/card-product";

export default function ProductListing() {
  return (
    <div className="grid grid-cols-3 gap-[30px]">
      <CardProduct
        item={{
          category_name: "Desktop",
          id: 1,
          image_url:
            "assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png",
          name: "Apple Desktop Imac",
          price: 1200000,
        }}
      />
    </div>
  );
}
