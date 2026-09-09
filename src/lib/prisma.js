import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis;

function getPrismaClient() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DIRECT_URL or DATABASE_URL must be configured before using Prisma");
  }

  const client = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

export const prisma = new Proxy({}, {
  get(_target, property) {
    return getPrismaClient()[property];
  },
});