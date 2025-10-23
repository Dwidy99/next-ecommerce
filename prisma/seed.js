const { PrismaClient } = require("@prisma/client");
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
  console.log("🚀 Starting Prisma Seeder...");
  // Contoh tambahan user superadmin
  const adminExists = await prisma.user.findFirst({
    where: { email: "admin@example.com" },
  });
  if (!adminExists) {
    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "admin@example.com",
        password: await bcrypt.hash("123456", 10),
        role: "superadmin",
      },
    });
    console.log("✅ Superadmin created");
  }

  // --------- Category slug ---------
  const categories = await prisma.category.findMany();
  for (const cat of categories) {
    if (!cat.slug) {
      await prisma.category.update({
        where: { id: cat.id },
        data: { slug: slugify(cat.name) },
      });
      console.log(`✅ Category slug updated: ${cat.name}`);
    }
  }

  // --------- Product slug ---------
  const products = await prisma.product.findMany();
  for (const p of products) {
    if (!p.slug) {
      await prisma.product.update({
        where: { id: p.id },
        data: { slug: slugify(p.name) },
      });
      console.log(`✅ Product slug updated: ${p.name}`);
    }
  }

  // --------- Configuration ---------
  const existing = await prisma.configuration.findFirst();
  if (!existing) {
    await prisma.configuration.create({
      data: {
        language: "ID",
        webname: "Default Website",
        short_name: "E-Commerce",
        tagline: "Belanja mudah dan cepat",
        description: "Website e-commerce modern.",
        website: "https://example.com",
        email: "info@example.com",
        logo: "/logo.png",
        icon: "/favicon.ico",
        keywords: "ecommerce, online store, belanja online",
        metatext: "Belanja aman dan nyaman di toko kami.",
      },
    });
    console.log("✅ Default configuration created");
  } else {
    console.log("ℹ️ Configuration already exists");
  }
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
