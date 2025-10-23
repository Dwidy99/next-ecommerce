// prisma/seed.js
import { slugify } from "/lib/utils";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany();
  for (const cat of categories) {
    if (!cat.slug) {
      await prisma.category.update({
        where: { id: cat.id },
        data: { slug: slugify(cat.name) },
      });
    }
  }

  const products = await prisma.product.findMany();
  for (const p of products) {
    if (!p.slug) {
      await prisma.product.update({
        where: { id: p.id },
        data: { slug: slugify(p.name) },
      });
    }
  }

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
    console.log("✅ Default site configuration created");
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
  });
