import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import { getPrismaDatabaseUrl } from "./src/lib/database-url.js";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: getPrismaDatabaseUrl(env("DATABASE_URL")),
  },
});