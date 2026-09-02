require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const products = [
  ["Beetroot", "200g", 299, 399, true, "Naturally rich in nitrates and antioxidants, beetroot supports stamina, heart health, and better blood flow throughout the day.", ["/products/beetroot_1.webp", "/products/beetroot_2.webp", "/products/beetroot_3.webp", "/products/beetroot_4.webp"]],
  ["Gooseberry", "200g", 349, 449, true, "Packed with Vitamin C and natural antioxidants, gooseberry helps support immunity, digestion, and everyday vitality.", ["/products/goosberry_1.webp", "/products/goosberry_2.webp", "/products/goosberry_3.webp", "/products/goosberry_4.webp"]],
  ["Moringa", "200g", 399, 499, true, "Moringa is a nutrient-dense superleaf known for supporting immunity, energy, and balanced daily wellness.", ["/products/moringa_1.webp", "/products/moringa_2.webp", "/products/moringa_3.webp", "/products/moringa_4.webp"]],
  ["Neem", "200g", 389, 499, true, "Neem is traditionally valued for its natural cleansing support, skin wellness, and daily balance.", ["/products/neem_1.webp", "/products/neem_2.webp", "/products/neem_3.webp", "/products/neem_4.webp"]],
  ["Everfit", "60 capsules", 499, 649, true, "Everfit is a wellness-support formula designed to promote everyday vitality, better balance, and a natural daily health routine.", ["/products/everfit_1.webp", "/products/everfit_2.webp", "/products/everfit_3.webp", "/products/everfit_4.webp"]],
  ["Giloy Powder", "200g", 429, 549, true, "Giloy powder is traditionally used to support immunity, vitality, and overall balance with a pure herbal profile.", ["/products/giloy_1.webp", "/products/giloy_2.webp", "/products/giloy_3.webp", "/products/giloy_4.webp"]],
];

async function main() {
  await prisma.product.deleteMany({
    where: {
      OR: [{ name: "Neem Everfit" }, { slug: "neem-everfit" }],
    },
  });

  const category = await prisma.category.upsert({
    where: { slug: "veggiecrush-wellness" },
    update: {},
    create: { name: "VeggieCrush Wellness", slug: "veggiecrush-wellness" },
  });

  for (const [name, label, price, mrp, isBestSeller, description, images] of products) {
    const product = await prisma.product.upsert({
      where: { slug: slugify(name) },
      update: {
        description,
        images,
        startingAt: price * 100,
        isBestSeller,
        isActive: true,
        categoryId: category.id,
      },
      create: {
        name,
        slug: slugify(name),
        description,
        images,
        startingAt: price * 100,
        isBestSeller,
        categoryId: category.id,
      },
    });

    await prisma.productVariant.upsert({
      where: { productId_label: { productId: product.id, label } },
      update: { price: price * 100, mrp: mrp * 100, stock: 100, isActive: true },
      create: { productId: product.id, label, price: price * 100, mrp: mrp * 100, stock: 100 },
    });
  }
}

main()
  .catch((error) => {
    console.error("\nDatabase seed failed. Make sure PostgreSQL is running and your DATABASE_URL / DIRECT_URL values in [.env](.env) are valid.");
    console.error("Error details:");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
