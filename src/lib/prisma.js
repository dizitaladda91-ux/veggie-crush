import { PrismaClient } from "@prisma/client";
import { getPrismaDatabaseUrl } from "./database-url";

const globalForPrisma = globalThis;

function getPrismaClient() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const client = new PrismaClient({
    datasourceUrl: getPrismaDatabaseUrl(process.env.DATABASE_URL),
  });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

export const prisma = new Proxy({}, {
  get(_target, property) {
    return getPrismaClient()[property];
  },
});