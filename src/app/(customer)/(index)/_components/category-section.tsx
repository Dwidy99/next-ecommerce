import CardProduct from "./card-product";

interface CategorySectionProps {
  category: {
    id: number;
    name: string;
    slug: string | null;
    products: {
      id: number;
      name: string;
      price: number;
      image_url: string;
      category_name: string;
    }[];
  };
}

export default function CategorySection({ category }: CategorySectionProps) {
  if (!category.products.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-[#110843] mb-6">
        {category.name}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.products.map((item) => (
          <CardProduct key={item.id} item={item as any} />
        ))}
      </div>
    </section>
  );
}
