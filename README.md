This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Mongoose product catalog

The product and combo catalog uses Mongoose. Set `MONGO_URI` to the same MongoDB database used by `DATABASE_URL`, so existing Prisma review, wishlist, and order references remain valid. If `MONGO_URI` is unset, the catalog uses `DATABASE_URL` when it is a MongoDB URI; otherwise it uses `mongodb://127.0.0.1:27017/veggiecrush`.

### Importing products from a Word document

In Admin Portal → Add New Product, upload a `.docx` document containing a table with one product per row. Use these column headers:

| Name | Short Name | Slug | Description | Key Benefits | Price | MRP | Size | Rating | Reviews | Bestseller | Code |
| --- | --- | --- | --- | --- | ---: | ---: | --- | ---: | ---: | --- | --- |

`Name`, `Price`, `MRP`, `Size`, and `Description` are required. Product codes are optional unique SKUs of up to 64 letters, numbers, hyphens, or underscores; codes are normalized to uppercase. Omit `Code` to reuse the product's existing SKU by slug or have one generated from its slug. Separate benefits with commas, semicolons, or `|`; use Yes/No for Bestseller. Uploading parses a preview without publishing. Review/edit it, then explicitly confirm to publish every listed product. Matching slugs update existing products and keep their current images. The import endpoint is restricted to authenticated users with the `ADMIN` role.

Install dependencies, then seed products before combos:

```bash
npm install
node seed/seedProducts.js
node seed/seedCombos.js
npm run test:combos
```

Product images can later be updated by slug without rerunning the seed:

```js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const { getMongoUri } = require("./lib/mongoose");

async function updateProductImages() {
  await mongoose.connect(getMongoUri());
  const product = await Product.findOne({ slug: "beetroot" });
  if (!product) throw new Error("Product with slug 'beetroot' was not found.");
  product.images = ["/products/beetroot_1.webp", "/products/beetroot_2.webp"];
  await product.save();
}

updateProductImages()
  .catch((error) => {
    console.error("Could not update product images:", error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
