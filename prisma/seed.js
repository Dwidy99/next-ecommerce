const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  console.log("🚀 Starting Prisma Seeder (English Data)...");

  await prisma.orderProduct.deleteMany();
  await prisma.orderDetail.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.location.deleteMany();
  await prisma.user.deleteMany();
  await prisma.configuration.deleteMany();

  console.log("🧹 Existing data cleared");

  // 1️⃣ Superadmin User
  const adminEmail = "admin@example.com";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  if (!existingAdmin) {
    await prisma.user.createMany({
      data: [
        {
          name: "Super Admin",
          email: adminEmail,
          password: await bcrypt.hash("Admin123!", 10),
          role: "superadmin",
          image: "/uploads/admin-avatar.png",
        },
        {
          name: "Customer 1",
          email: "rchemical7@gmail.com",
          password: await bcrypt.hash("qwerty12", 10),
          role: "customer",
          image: "/uploads/admin-avatar.png",
        },
      ],
    });
    console.log(
      "✅ Superadmin user created (email: admin@example.com | pass: Admin123!)"
    );
  } else {
    console.log("ℹ️ Superadmin already exists");
  }

  // 2️⃣ Brands
  const brands = [
    { name: "TechNova", logo: "/uploads/brand-technova.png" },
    { name: "UrbanStyle", logo: "/uploads/brand-urbanstyle.png" },
    { name: "NatureEssence", logo: "/uploads/brand-natureessence.png" },
  ];
  for (const brand of brands) {
    const existing = await prisma.brand.findFirst({
      where: { name: brand.name },
    });
    if (!existing) {
      await prisma.brand.create({ data: brand });
      console.log(`✅ Brand created: ${brand.name}`);
    }
  }

  // 3️⃣ Categories
  const categories = [
    { name: "Electronics" },
    { name: "Fashion" },
    { name: "Home & Living" },
  ];
  for (const cat of categories) {
    const existing = await prisma.category.findFirst({
      where: { name: cat.name },
    });
    if (!existing) {
      await prisma.category.create({
        data: { ...cat, slug: slugify(cat.name) },
      });
      console.log(`✅ Category created: ${cat.name}`);
    }
  }

  // 4️⃣ Locations
  const locations = [
    { name: "New York Warehouse" },
    { name: "Los Angeles Store" },
  ];
  for (const loc of locations) {
    const existing = await prisma.location.findFirst({
      where: { name: loc.name },
    });
    if (!existing) {
      await prisma.location.create({ data: loc });
      console.log(`✅ Location created: ${loc.name}`);
    }
  }

  // 5️⃣ Products
  const brandTech = await prisma.brand.findFirst({
    where: { name: "TechNova" },
  });
  const brandUrban = await prisma.brand.findFirst({
    where: { name: "UrbanStyle" },
  });
  const catElec = await prisma.category.findFirst({
    where: { name: "Electronics" },
  });
  const catFashion = await prisma.category.findFirst({
    where: { name: "Fashion" },
  });
  const catHome = await prisma.category.findFirst({
    where: { name: "Home & Living" },
  });
  const locNY = await prisma.location.findFirst({
    where: { name: "New York Warehouse" },
  });

  const products = [
    {
      name: "Smartphone X200",
      description:
        "A powerful smartphone with a 6.7-inch AMOLED display, 128GB storage, and 5G connectivity.",
      price: BigInt(69900),
      stock: "ready",
      images: [
        "/uploads/products/x200-front.jpg",
        "/uploads/products/x200-back.jpg",
      ],
      brand_id: brandTech.id,
      category_id: catElec.id,
      location_id: locNY.id,
    },
    {
      name: "Wireless Earbuds Pro",
      description:
        "Noise-cancelling earbuds with 24-hour battery life and quick charge feature.",
      price: BigInt(14900),
      stock: "ready",
      images: ["/uploads/products/earbuds.jpg"],
      brand_id: brandTech.id,
      category_id: catElec.id,
      location_id: locNY.id,
    },
    {
      name: "Men's Casual Jacket",
      description:
        "Stylish and lightweight jacket perfect for all seasons. Designed with breathable fabric.",
      price: BigInt(8900),
      stock: "ready",
      images: ["/uploads/products/jacket.jpg"],
      brand_id: brandUrban.id,
      category_id: catFashion.id,
      location_id: locNY.id,
    },
    {
      name: "Women's Leather Handbag",
      description:
        "Elegant handcrafted handbag made from genuine leather with adjustable straps.",
      price: BigInt(11900),
      stock: "ready",
      images: ["/uploads/products/handbag.jpg"],
      brand_id: brandUrban.id,
      category_id: catFashion.id,
      location_id: locNY.id,
    },
    {
      name: "Aromatic Soy Candle Set",
      description:
        "Set of 3 premium soy candles with relaxing scents: lavender, vanilla, and ocean breeze.",
      price: BigInt(4900),
      stock: "ready",
      images: ["/uploads/products/candle.jpg"],
      brand_id: brandUrban.id,
      category_id: catHome.id,
      location_id: locNY.id,
    },
  ];

  for (const product of products) {
    const existing = await prisma.product.findFirst({
      where: { name: product.name },
    });
    if (!existing) {
      await prisma.product.create({
        data: { ...product, slug: slugify(product.name) },
      });
      console.log(`✅ Product created: ${product.name}`);
    }
  }

  // 6️⃣ Configuration (Site Meta)
  await prisma.configuration.deleteMany(); // paksa clear

  await prisma.configuration.create({
    data: {
      language: "ID",
      webname: "Next Commerce",
      short_name: "NextCommerce",
      tagline: "Shop the Future",
      description:
        "Next Commerce is a modern e-commerce platform built with Next.js and Prisma.",
      website: "https://nextcommerce.example.com",
      email: "support@nextcommerce.com",
      logo: "/uploads/logo.png",
      icon: "/uploads/favicon.ico",
      keywords: "ecommerce, online shopping, nextcommerce",
      metatext:
        "Discover the latest trends in tech, fashion, and home essentials with Next Commerce.",
    },
  });
  console.log("✅ Default configuration created");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🌱 Seeding complete!");
  });
