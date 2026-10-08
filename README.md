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

## Checkout, order history, and invoices

Checkout recalculates product and combo prices on the server, creates the Razorpay payment order, and confirms a VeggieCrush order only after a captured payment is verified. Customers can view their orders in `/account`; paid, non-cancelled orders include a downloadable PDF order invoice/payment receipt.

For payment recovery when a customer closes the browser before checkout can return its result, configure a Razorpay webhook with URL `https://<your-site-host>/api/checkout/webhook` and subscribe to the `payment.captured` event. Set `RAZORPAY_WEBHOOK_SECRET` in the local/deployment environment to the webhook secret configured in Razorpay. The handler verifies Razorpay's signature over the raw request body and safely ignores duplicate deliveries. The regular checkout signature flow remains enabled as well.

## Mongoose product catalog

The product and combo catalog uses Mongoose. Set `MONGO_URI` to the same MongoDB database used by `DATABASE_URL`, so existing Prisma review, wishlist, and order references remain valid. If `MONGO_URI` is unset, the catalog uses `DATABASE_URL` when it is a MongoDB URI; otherwise it uses `mongodb://127.0.0.1:27017/veggiecrush`.

Product image uploads from Admin Portal use Cloudinary's server-side Node SDK. Set `CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>` in `.env` and deployment settings (or configure all three individual Cloudinary variables as a fallback). Never expose this credential in a `NEXT_PUBLIC_*` variable. The original single-image uploader and the bulk uploader are restricted to authenticated admins; files are size/type checked and stored as secure URLs in the catalog.

### Bulk catalog image attachment

Put image files in the repository's `uploads/` directory and use these names:

| Item | Examples |
| --- | --- |
| Product slug | `beetroot.webp`, `gooseberry_2.webp`, `giloy-powder.png` |
| Combo code, optionally followed by slug | `AB.webp`, `AB_1.webp`, `ABCD_beetroot-amla-moringa-everfit.webp` |
| Combo slug | `beetroot-amla.webp` |

Supported extensions are `.webp`, `.png`, `.jpg`, and `.jpeg`. Combo code is checked first, then product slug, then combo slug. A missing number sorts first; `_1`, `_2`, and so on follow in numeric order. Product images upload to `veggiecrush/products`; combo images upload to `veggiecrush/combos`. Each Cloudinary public ID is the filename without its extension, with `overwrite: true`. The script uploads at most five files concurrently and retries a failed upload twice. A partially failed item keeps its previous images while adding successful uploads.

Install dependencies and seed the catalog before running the dry check:

```bash
npm install
Copy-Item .env.example .env
New-Item -ItemType Directory -Force uploads
# Set CLOUDINARY_URL and MONGO_URI in .env; put image files inside uploads/.
npm run test:images
npm run images:attach -- --dry
```

Review matched, unmatched, and missing items. Then run the real upload (default replaces each matched item's image array) or append without removing existing images:

```bash
npm run images:attach
npm run images:attach -- --append
```

Admin users can also upload up to 20 images at a time from Admin Portal → Products. The API is `POST /api/admin/images/bulk` with repeated multipart `files` fields and an optional `append=true` field. Next.js Route Handlers parse multipart data with `request.formData()`; Multer is an Express middleware and is not needed or compatible with this App Router project. The API returns `matched`, `unmatched`, and `failed` lists.

Delete one managed Cloudinary image and its catalog reference using admin-authenticated `DELETE /api/admin/images` with JSON `{ "itemType": "product", "itemId": "<mongoose-id>", "imageIndex": 0 }` (use `"combo"` for combo records). The image must already be attached to that catalog item and stored under the matching VeggieCrush Cloudinary folder.

`getCloudinaryImageUrl(url, width)` adds `f_auto,q_auto,w_<width>` to Cloudinary URLs. Product/combo card images use 600px; product detail gallery uses 1200px. Cards show the first image, switch to the second on hover, and use a placeholder when no image is saved.

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
