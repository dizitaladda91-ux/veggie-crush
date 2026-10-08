import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FALLBACK_PRODUCTS = [
  {
    id: "1",
    name: "Beetroot",
    slug: "beetroot",
    description: "Naturally rich in nitrates and antioxidants, beetroot supports stamina, heart health, and better blood flow throughout the day.",
    images: ["/products/beetroot_1.webp", "/products/beetroot_2.webp", "/products/beetroot_3.webp", "/products/beetroot_4.webp"],
    price: 299,
    mrp: 399,
    unit: "200g",
    rating: 4.7,
    reviews: 128,
    category: "VeggieCrush Wellness",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Gooseberry",
    slug: "gooseberry",
    description: "Packed with Vitamin C and natural antioxidants, gooseberry helps support immunity, digestion, and everyday vitality.",
    images: ["/products/goosberry_1.webp", "/products/goosberry_2.webp", "/products/goosberry_3.webp", "/products/goosberry_4.webp"],
    price: 349,
    mrp: 449,
    unit: "200g",
    rating: 4.8,
    reviews: 94,
    category: "VeggieCrush Wellness",
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Moringa",
    slug: "moringa",
    description: "Moringa is a nutrient-dense superleaf known for supporting immunity, energy, and balanced daily wellness.",
    images: ["/products/moringa_1.webp", "/products/moringa_2.webp", "/products/moringa_3.webp", "/products/moringa_4.webp"],
    price: 399,
    mrp: 499,
    unit: "200g",
    rating: 4.7,
    reviews: 143,
    category: "VeggieCrush Wellness",
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Neem",
    slug: "neem",
    description: "Neem is traditionally valued for its natural cleansing support, skin wellness, and daily balance.",
    images: ["/products/neem_1.webp", "/products/neem_2.webp", "/products/neem_3.webp", "/products/neem_4.webp"],
    price: 389,
    mrp: 499,
    unit: "200g",
    rating: 4.6,
    reviews: 68,
    category: "VeggieCrush Wellness",
    isBestSeller: true,
  },
  {
    id: "5",
    name: "Everfit",
    slug: "everfit",
    description: "Everfit is a wellness-support formula designed to promote everyday vitality, better balance, and a natural daily health routine.",
    images: ["/products/everfit_1.webp", "/products/everfit_2.webp", "/products/everfit_3.webp", "/products/everfit_4.webp"],
    price: 499,
    mrp: 649,
    unit: "60 capsules",
    rating: 4.6,
    reviews: 72,
    category: "VeggieCrush Wellness",
    isBestSeller: true,
  },
  {
    id: "6",
    name: "Giloy Powder",
    slug: "giloy-powder",
    description: "Giloy powder is traditionally used to support immunity, vitality, and overall balance with a pure herbal profile.",
    images: ["/products/giloy_1.webp", "/products/giloy_2.webp", "/products/giloy_3.webp", "/products/giloy_4.webp"],
    price: 429,
    mrp: 549,
    unit: "200g",
    rating: 4.8,
    reviews: 101,
    category: "VeggieCrush Wellness",
    isBestSeller: true,
  },
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const condition = searchParams.get("condition");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get("limit") || "12", 10)));
    const skip = (page - 1) * limit;

    const where = {
      isActive: true,
      name: { not: "Neem Everfit" },
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category) {
      where.category = { slug: category };
    }

    if (condition) {
      where.conditions = {
        some: {
          condition: { slug: condition },
        },
      };
    }

    let orderBy = { createdAt: "desc" };
    if (sort === "price_asc") orderBy = { startingAt: "asc" };
    else if (sort === "price_desc") orderBy = { startingAt: "desc" };
    else if (sort === "popular") orderBy = { isBestSeller: "desc" };

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          variants: {
            where: { isActive: true },
            orderBy: { price: "asc" },
          },
          reviews: { select: { rating: true } },
          conditions: {
            include: {
              condition: { select: { id: true, name: true, slug: true } },
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
    ]);

    const formattedProducts = products.map((product) => {
      const variant = product.variants[0];
      const rating = product.reviews.length
        ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
        : 0;

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description || "",
        images: product.images || [],
        price: variant?.price ? variant.price / 100 : product.startingAt / 100,
        mrp: variant?.mrp ? variant.mrp / 100 : product.startingAt / 100,
        unit: variant?.label || "",
        rating: Number(rating.toFixed(1)),
        reviews: product.reviews.length,
        category: product.category?.name || "General",
        conditions: product.conditions.map((c) => c.condition.name),
        isBestSeller: product.isBestSeller,
        variants: product.variants.map((v) => ({
          id: v.id,
          label: v.label,
          price: v.price / 100,
          mrp: v.mrp / 100,
          stock: v.stock,
        })),
      };
    });

    return NextResponse.json({
      products: formattedProducts.length > 0 ? formattedProducts : FALLBACK_PRODUCTS,
      pagination: {
        total: total || FALLBACK_PRODUCTS.length,
        page,
        limit,
        totalPages: Math.ceil((total || FALLBACK_PRODUCTS.length) / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products from database:", error.message);
    // Return gracefully with fallback data if database is not reachable yet
    return NextResponse.json({
      products: FALLBACK_PRODUCTS,
      pagination: {
        total: FALLBACK_PRODUCTS.length,
        page: 1,
        limit: FALLBACK_PRODUCTS.length,
        totalPages: 1,
      },
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      slug: customSlug,
      description,
      price,
      mrp,
      unit,
      stock = 50,
      category,
      categoryId,
      images,
      isBestSeller = false,
      isActive = true,
    } = body;

    if (!name || price === undefined) {
      return NextResponse.json(
        { error: "Product name and price are required." },
        { status: 400 }
      );
    }

    const slug = (
      customSlug ||
      name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    ) + (customSlug ? "" : `-${Date.now().toString().slice(-4)}`);

    const numPrice = Number(price);
    const numMrp = mrp ? Number(mrp) : numPrice;
    const priceInPaise = Math.round(numPrice * 100);
    const mrpInPaise = Math.round(numMrp * 100);
    const productImages = Array.isArray(images) && images.length > 0 ? images : ["/products/moringa_1.webp"];

    try {
      // 1. Resolve or create Category
      let resolvedCategoryId = categoryId;
      if (!resolvedCategoryId && category) {
        const catSlug = category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
        const existingCat = await prisma.category.findFirst({
          where: { OR: [{ slug: catSlug }, { name: category }] },
        });

        if (existingCat) {
          resolvedCategoryId = existingCat.id;
        } else {
          const newCat = await prisma.category.create({
            data: {
              name: category,
              slug: catSlug,
            },
          });
          resolvedCategoryId = newCat.id;
        }
      }

      // If still no categoryId, pick first available category or create default
      if (!resolvedCategoryId) {
        let firstCat = await prisma.category.findFirst();
        if (!firstCat) {
          firstCat = await prisma.category.create({
            data: {
              name: "Leafy Greens",
              slug: "leafy-greens",
            },
          });
        }
        resolvedCategoryId = firstCat.id;
      }

      // 2. Create Product with variant
      const createdProduct = await prisma.product.create({
        data: {
          name,
          slug,
          description: description || "",
          images: productImages,
          startingAt: priceInPaise,
          isBestSeller: Boolean(isBestSeller),
          isActive: Boolean(isActive),
          categoryId: resolvedCategoryId,
          variants: {
            create: [
              {
                label: unit || "Standard Pack",
                price: priceInPaise,
                mrp: mrpInPaise,
                stock: Number(stock) || 50,
                isActive: true,
              },
            ],
          },
        },
        include: {
          category: true,
          variants: true,
        },
      });

      return NextResponse.json({
        success: true,
        product: {
          id: createdProduct.id,
          name: createdProduct.name,
          slug: createdProduct.slug,
          description: createdProduct.description,
          price: numPrice,
          mrp: numMrp,
          unit: unit || "Standard Pack",
          category: createdProduct.category?.name || category || "General",
          images: createdProduct.images,
          isBestSeller: createdProduct.isBestSeller,
        },
      });
    } catch (dbError) {
      console.warn("DB save failed, saving to local in-memory store:", dbError.message);
      // Fallback in-memory product creation
      const mockProduct = {
        id: `local_${Date.now()}`,
        name,
        slug,
        description: description || "",
        images: productImages,
        price: numPrice,
        mrp: numMrp,
        unit: unit || "Standard Pack",
        rating: 5.0,
        reviews: 0,
        category: category || "Leafy Greens",
        isBestSeller: Boolean(isBestSeller),
      };
      FALLBACK_PRODUCTS.unshift(mockProduct);

      return NextResponse.json({
        success: true,
        product: mockProduct,
        note: "Saved to local catalog",
      });
    }
  } catch (err) {
    console.error("Error creating product:", err);
    return NextResponse.json(
      { error: "Failed to create product: " + err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    try {
      await prisma.product.delete({ where: { id } });
    } catch {
      const idx = FALLBACK_PRODUCTS.findIndex((p) => p.id === id);
      if (idx !== -1) {
        FALLBACK_PRODUCTS.splice(idx, 1);
      }
    }

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
