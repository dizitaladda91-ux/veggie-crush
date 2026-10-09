import { promises as fs } from "fs";
import path from "path";

const fallbackPosts = [
  {
    id: "1",
    slug: "seasonal-vegetables-month",
    title: "5 Seasonal Vegetables You Should Be Eating This Month",
    excerpt: "Eating with the natural agricultural calendar yields better flavour, lower carbon footprints, and up to 300% more bioavailable vitamins.",
    category: "Seasonal Guide",
    readTime: "6 min read",
    date: "Aug 3, 2026",
    author: "Dr. Rajeshwar Rao, Agronomist",
    emoji: "🥕",
    accent: "#6FAE3E",
    featured: true,
    content: "When you consume produce harvested in its natural season, plants develop full nutrient spectrums without artificial ripening gases or prolonged refrigeration.\n\n### Why Seasonal Eating Matters\n1. **Higher Phytonutrient Density**: Studies demonstrate that spinach harvested in winter contains twice the Vitamin C levels of out-of-season summer spinach.\n2. **Superior Flavor**: Cold-weather roots accumulate natural starches and sugars that convert into sweet, crisp flavours.\n3. **Soil Regeneration**: Seasonal crop rotations preserve soil microbiomes and reduce nitrogen depletion.\n\n### Top 5 Picks for This Month\n- **Cold-Pressed Beetroot**: High in dietary nitrates to support cardiovascular endurance.\n- **Tender Farm Fenugreek (Methi)**: Rich in soluble fiber for natural glucose moderation.\n- **Young Drumstick Moringa**: Loaded with plant-based protein and over 46 natural antioxidants.\n- **Sweet Farm Carrots**: Abundant in beta-carotene and essential carotenoids.\n- **Fresh Country Giloy**: Renowned in classical Ayurveda for immune system modulation.",
    seoTitle: "Seasonal vegetables to eat this month | VeggieCrush Journal",
    seoDescription: "Discover the top seasonal vegetables to eat this month for better taste, nutrition, and soil-friendly farming.",
    focusKeyword: "seasonal vegetables",
    tags: ["seasonal guide", "nutrition", "organic vegetables"],
  },
  {
    id: "2",
    slug: "cold-chain-logistics",
    title: "How We Keep Vegetables Fresh From Farm to Door in 12 Hours",
    excerpt: "A deep dive into our solar-powered cold hubs, ozone water sanitization, and temperature-controlled doorstep delivery.",
    category: "Behind the Scenes",
    readTime: "4 min read",
    date: "Jul 28, 2026",
    author: "Pooja Varma, Logistics Lead",
    emoji: "🚚",
    accent: "#1E4620",
    featured: false,
    content: "Traditional supermarket produce spends between 5 to 9 days in transit, losing up to 50% of vital vitamin reserves before reaching your kitchen. At VeggieCrush, we engineered a direct farm-to-kitchen pipeline.\n\n### Our 12-Hour Journey\n- **5:30 AM**: Harvesters hand-cut crops at lowest soil temperature.\n- **8:00 AM**: Produce is rinsed with food-grade ozone-infused chilled water.\n- **11:00 AM**: Hand-sorted and packed in breathable, eco-friendly cartons.\n- **4:00 PM - 8:00 PM**: Reached to your kitchen via temperature-regulated electric vans.",
    seoTitle: "Farm to door produce logistics | VeggieCrush",
    seoDescription: "Learn how VeggieCrush keeps vegetables fresh from farm to door with cold-chain logistics and strict quality control.",
    focusKeyword: "farm to door vegetables",
    tags: ["logistics", "freshness", "farm delivery"],
  },
];

const dataFilePath = path.join(process.cwd(), "data", "blog-posts.json");

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function ensureFile() {
  const directory = path.dirname(dataFilePath);
  await fs.mkdir(directory, { recursive: true });
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify(fallbackPosts, null, 2));
  }
}

export async function getBlogPosts() {
  await ensureFile();
  const raw = await fs.readFile(dataFilePath, "utf8");
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // ignore malformed JSON and fall back to defaults
  }
  return fallbackPosts;
}

export async function saveBlogPosts(posts) {
  await ensureFile();
  await fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2));
  return posts;
}

export async function getBlogPostById(identifier) {
  const posts = await getBlogPosts();
  return posts.find((post) => String(post.id) === String(identifier) || String(post.slug) === String(identifier)) || null;
}

export async function upsertBlogPost(input) {
  const posts = await getBlogPosts();
  const payload = {
    id: input.id ? String(input.id) : String(Date.now()),
    slug: input.slug || slugify(input.title),
    title: input.title?.trim(),
    excerpt: input.excerpt?.trim() || "",
    category: input.category?.trim() || "General",
    readTime: input.readTime?.trim() || "4 min read",
    date: input.date?.trim() || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    author: input.author?.trim() || "VeggieCrush Editorial Team",
    emoji: input.emoji?.trim() || "🌿",
    accent: input.accent?.trim() || "#1E4620",
    featured: Boolean(input.featured),
    content: input.content?.trim() || "",
    seoTitle: input.seoTitle?.trim() || input.title?.trim(),
    seoDescription: input.seoDescription?.trim() || input.excerpt?.trim(),
    focusKeyword: input.focusKeyword?.trim() || "veggiecrush",
    tags: Array.isArray(input.tags) ? input.tags.map((tag) => String(tag).trim()).filter(Boolean) : [],
  };

  const existingIndex = posts.findIndex((post) => String(post.id) === String(payload.id));

  if (existingIndex >= 0) {
    posts[existingIndex] = { ...posts[existingIndex], ...payload };
  } else {
    posts.unshift(payload);
  }

  await saveBlogPosts(posts);
  return payload;
}

export function getSeoPortalCredentials() {
  return {
    username: process.env.SEO_PORTAL_USERNAME || process.env.ADMIN_EMAIL || "veggiecrushseo",
    password: process.env.SEO_PORTAL_PASSWORD || process.env.ADMIN_PASSWORD || "veggiecrushseo@2026",
  };
}
