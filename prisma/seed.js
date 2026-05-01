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

async function upsertByName(model, data) {
  const existing = await model.findFirst({ where: { name: data.name } });

  if (existing) {
    return model.update({
      where: { id: existing.id },
      data,
    });
  }

  return model.create({ data });
}

async function upsertHomeContent(model, uniqueField, data) {
  const existing = await model.findFirst({
    where: { [uniqueField]: data[uniqueField] },
  });

  if (existing) {
    return model.update({
      where: { id: existing.id },
      data,
    });
  }

  return model.create({ data });
}

async function seedUsers() {
  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const customerPassword = await bcrypt.hash("qwerty12", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {
      name: "Super Admin",
      password: adminPassword,
      role: "superadmin",
      image: "/assets/icons/profile-circle.svg",
      emailVerified: new Date(),
    },
    create: {
      name: "Super Admin",
      email: "admin@example.com",
      password: adminPassword,
      role: "superadmin",
      image: "/assets/icons/profile-circle.svg",
      emailVerified: new Date(),
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "guest@gmail.com" },
    update: {
      name: "Guest Customer",
      password: customerPassword,
      role: "customer",
      image: "/assets/icons/profile-circle.svg",
      emailVerified: new Date(),
    },
    create: {
      name: "Guest Customer",
      email: "guest@gmail.com",
      password: customerPassword,
      role: "customer",
      image: "/assets/icons/profile-circle.svg",
      emailVerified: new Date(),
    },
  });

  console.log("Users ready:", {
    admin: admin.email,
    customer: customer.email,
  });

  return { admin, customer };
}

async function seedCatalog() {
  const brands = [
    { name: "TechNova", logo: "/assets/logos/logos.svg" },
    { name: "UrbanStyle", logo: "/assets/logos/logos.svg" },
    { name: "NatureEssence", logo: "/assets/logos/logos.svg" },
  ];

  const categories = [
    { name: "Electronics" },
    { name: "Fashion" },
    { name: "Home & Living" },
    { name: "Accessories" },
  ];

  const locations = [
    { name: "Jakarta Warehouse" },
    { name: "Tangerang Store" },
    { name: "Bandung Hub" },
  ];

  for (const brand of brands) {
    await upsertByName(prisma.brand, brand);
  }

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: slugify(category.name) },
      update: {
        name: category.name,
      },
      create: {
        name: category.name,
        slug: slugify(category.name),
      },
    });
  }

  for (const location of locations) {
    await upsertByName(prisma.location, location);
  }

  const brandTech = await prisma.brand.findFirstOrThrow({ where: { name: "TechNova" } });
  const brandUrban = await prisma.brand.findFirstOrThrow({ where: { name: "UrbanStyle" } });
  const brandNature = await prisma.brand.findFirstOrThrow({ where: { name: "NatureEssence" } });
  const catElectronics = await prisma.category.findFirstOrThrow({ where: { slug: "electronics" } });
  const catFashion = await prisma.category.findFirstOrThrow({ where: { slug: "fashion" } });
  const catHome = await prisma.category.findFirstOrThrow({ where: { slug: "home-living" } });
  const catAccessories = await prisma.category.findFirstOrThrow({ where: { slug: "accessories" } });
  const locJakarta = await prisma.location.findFirstOrThrow({ where: { name: "Jakarta Warehouse" } });
  const locTangerang = await prisma.location.findFirstOrThrow({ where: { name: "Tangerang Store" } });

  const products = [
    {
      name: "Smartphone X200",
      description: "A reliable daily smartphone with clean design and enough power for work, study, and entertainment.",
      price: BigInt(89900),
      stock: "ready",
      images: ["/assets/banners/1.jpg"],
      brand_id: brandTech.id,
      category_id: catElectronics.id,
      location_id: locJakarta.id,
    },
    {
      name: "Wireless Earbuds Pro",
      description: "Wireless earbuds with compact charging case, clear sound, and comfortable fit for daily use.",
      price: BigInt(14900),
      stock: "ready",
      images: ["/assets/banners/2.jpg"],
      brand_id: brandTech.id,
      category_id: catAccessories.id,
      location_id: locJakarta.id,
    },
    {
      name: "Men's Casual Jacket",
      description: "A lightweight jacket for casual outfits, travel, and everyday outdoor activities.",
      price: BigInt(8900),
      stock: "ready",
      images: ["/assets/banners/3.jpg"],
      brand_id: brandUrban.id,
      category_id: catFashion.id,
      location_id: locTangerang.id,
    },
    {
      name: "Women's Leather Handbag",
      description: "A simple handbag with elegant shape, easy storage, and a versatile daily look.",
      price: BigInt(11900),
      stock: "preorder",
      images: ["/assets/banners/4.jpg"],
      brand_id: brandUrban.id,
      category_id: catFashion.id,
      location_id: locTangerang.id,
    },
    {
      name: "Aromatic Soy Candle Set",
      description: "A calming home fragrance set for bedroom, workspace, and cozy evening routines.",
      price: BigInt(4900),
      stock: "ready",
      images: ["/assets/banners/5.jpg"],
      brand_id: brandNature.id,
      category_id: catHome.id,
      location_id: locJakarta.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: slugify(product.name) },
      update: product,
      create: {
        ...product,
        slug: slugify(product.name),
      },
    });
  }

  console.log("Catalog data ready");

  return {
    products: await prisma.product.findMany({ orderBy: { id: "asc" } }),
  };
}

async function seedConfiguration() {
  const existing = await prisma.configuration.findFirst({
    where: { language: "ID" },
  });

  const data = {
    language: "ID",
    webname: "Shopverse",
    short_name: "Shopverse",
    tagline: "Gadget store, bundle setup, and fast checkout.",
    description: "Shopverse is a clean e-commerce demo for gadgets, fashion, home items, and accessories.",
    website: "https://nextcommerce.example.com",
    email: "support@shopverse.com",
    logo: "/assets/logos/logos.svg",
    icon: "/favicon.ico",
    keywords: "ecommerce, online shopping, shopverse, gadgets",
    metatext: "Discover curated products with a clean catalog experience and simple checkout flow.",
    address: "Green Valley Residence, Block D7 No.15, Tangerang Selatan, Banten",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  };

  if (existing) {
    await prisma.configuration.update({
      where: { id: existing.id },
      data,
    });
  } else {
    await prisma.configuration.create({ data });
  }

  console.log("Configuration ready");
}

async function seedHomeContent() {
  const banners = [
    {
      eyebrow: "Smart Companion",
      title: "Keep your day moving with gadgets that match your routine.",
      description: "From daily drivers to smart accessories, find useful products without digging through noise.",
      image: "/assets/banners/4.jpg",
      primary_label: "Start Shopping",
      primary_url: "/catalogs",
      secondary_label: "View Cart",
      secondary_url: "/carts",
      sort_order: 1,
      is_active: true,
    },
    {
      eyebrow: "Office Setup",
      title: "Build a cleaner desk setup with everyday essentials.",
      description: "Find devices and accessories that help your workspace feel focused, practical, and ready to use.",
      image: "/assets/banners/2.jpg",
      primary_label: "Browse Catalog",
      primary_url: "/catalogs",
      secondary_label: "See Categories",
      secondary_url: "/catalogs",
      sort_order: 2,
      is_active: true,
    },
  ];

  const benefits = [
    { title: "Quality", description: "Curated gadgets", icon: "/assets/icons/crown.svg", sort_order: 1, is_active: true },
    { title: "Ready Stock", description: "Fast processing", icon: "/assets/icons/box.svg", sort_order: 2, is_active: true },
    { title: "Secure", description: "Safe checkout", icon: "/assets/icons/tick-circle.svg", sort_order: 3, is_active: true },
    { title: "Support", description: "Friendly help", icon: "/assets/icons/call.svg", sort_order: 4, is_active: true },
    { title: "Delivery", description: "Track orders", icon: "/assets/icons/cart.svg", sort_order: 5, is_active: true },
  ];

  const promos = [
    { title: "Custom Daily Driver", subtitle: "Bundle laptop, phone, and accessories", label: "Custom", image: "/assets/banners/1.jpg", button_text: "Learn More", button_url: "/catalogs", sort_order: 1, is_active: true },
    { title: "Office Setup", subtitle: "Clean desk essentials for better focus", label: "Custom", image: "/assets/banners/2.jpg", button_text: "Learn More", button_url: "/catalogs", sort_order: 2, is_active: true },
    { title: "Audio Collection", subtitle: "Wireless sound for work and travel", label: "Custom", image: "/assets/banners/3.jpg", button_text: "Learn More", button_url: "/catalogs", sort_order: 3, is_active: true },
    { title: "Smart Companion", subtitle: "Devices that keep your day moving", label: "Custom", image: "/assets/banners/4.jpg", button_text: "Learn More", button_url: "/catalogs", sort_order: 4, is_active: true },
    { title: "Accessories Drop", subtitle: "Small upgrades, big daily impact", label: "Custom", image: "/assets/banners/5.jpg", button_text: "Learn More", button_url: "/catalogs", sort_order: 5, is_active: true },
    { title: "Need a Bulk Order?", subtitle: "Talk with us for team and community packages.", label: "Custom", image: "/assets/banners/2.jpg", button_text: "Learn More", button_url: "/catalogs", sort_order: 6, is_active: true },
  ];

  const articles = [
    { title: "How to Choose a Laptop for Work and Study", slug: "how-to-choose-a-laptop-for-work-and-study", excerpt: "A short guide to choose practical devices for daily needs.", content: "Start with your daily workflow, budget, portability needs, and battery expectations.", image: "/assets/banners/1.jpg", meta: "Tips - 5 min read", is_active: true, published_at: new Date() },
    { title: "Simple Ways to Build a Cleaner Desk Setup", slug: "simple-ways-to-build-a-cleaner-desk-setup", excerpt: "Small upgrades that make your desk easier to use.", content: "Use fewer cables, add practical accessories, and keep only the tools you use daily.", image: "/assets/banners/2.jpg", meta: "Guide - 4 min read", is_active: true, published_at: new Date() },
    { title: "Accessories That Make Checkout Worth It", slug: "accessories-that-make-checkout-worth-it", excerpt: "Choose accessories that add real daily value.", content: "Prioritize protection, charging, comfort, and compatibility before buying extras.", image: "/assets/banners/3.jpg", meta: "Review - 3 min read", is_active: true, published_at: new Date() },
  ];

  for (const banner of banners) {
    await upsertHomeContent(prisma.homeBanner, "title", banner);
  }

  for (const benefit of benefits) {
    await upsertHomeContent(prisma.homeBenefit, "title", benefit);
  }

  for (const promo of promos) {
    await upsertHomeContent(prisma.homePromo, "title", promo);
  }

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
  }

  console.log("Home content ready");
}

async function seedSampleOrder(customer, products) {
  const product = products[0];
  if (!customer || !product) return;

  const order = await prisma.order.upsert({
    where: { code: "DEMO-PAID-001" },
    update: {
      status: "success",
      total: product.price,
      user_id: customer.id,
    },
    create: {
      code: "DEMO-PAID-001",
      status: "success",
      total: product.price,
      user_id: customer.id,
    },
  });

  await prisma.orderDetail.upsert({
    where: { order_id: order.id },
    update: {
      name: customer.name,
      phone: "081312345678",
      address: "Green Valley Residence",
      city: "Tangerang Selatan",
      postal_code: "15339",
      notes: "Demo paid order for purchase history testing.",
    },
    create: {
      order_id: order.id,
      name: customer.name,
      phone: "081312345678",
      address: "Green Valley Residence",
      city: "Tangerang Selatan",
      postal_code: "15339",
      notes: "Demo paid order for purchase history testing.",
    },
  });

  const existingOrderProduct = await prisma.orderProduct.findFirst({
    where: {
      order_id: order.id,
      product_id: product.id,
    },
  });

  const orderProductData = {
    order_id: order.id,
    product_id: product.id,
    quantity: 1,
    subtotal: product.price,
  };

  if (existingOrderProduct) {
    await prisma.orderProduct.update({
      where: { id: existingOrderProduct.id },
      data: orderProductData,
    });
  } else {
    await prisma.orderProduct.create({ data: orderProductData });
  }

  console.log("Sample paid order ready");
}

async function main() {
  console.log("Starting safe dummy data seed...");

  const { customer } = await seedUsers();
  const { products } = await seedCatalog();
  await seedConfiguration();
  await seedHomeContent();
  await seedSampleOrder(customer, products);

  console.log("Seed finished successfully.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
