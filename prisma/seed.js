const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const products = [
  ["Vine Tomatoes", "500g", 49, 65, true],
  ["Farm Carrots", "500g", 39, 50, true],
  ["Broccoli Florets", "300g", 79, 99, true],
  ["Baby Spinach", "200g", 35, 45, true],
  ["Green Chillies", "150g", 19, 25, false],
  ["Garlic Bulbs", "250g", 45, 60, true],
  ["Sweet Corn", "3 pcs", 55, 70, false],
  ["Red Onions", "1kg", 29, 38, true],
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "fresh-vegetables" },
    update: {},
    create: { name: "Fresh Vegetables", slug: "fresh-vegetables" },
  });

  for (const [name, label, price, mrp, isBestSeller] of products) {
    const product = await prisma.product.upsert({
      where: { slug: slugify(name) },
      update: {
        startingAt: price * 100,
        isBestSeller,
        isActive: true,
        categoryId: category.id,
      },
      create: {
        name,
        slug: slugify(name),
        images: [],
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
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
