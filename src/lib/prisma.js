import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

function getPrismaClient() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const client = new PrismaClient();

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

export const prisma = new Proxy({}, {
  get(_target, property) {
    return getPrismaClient()[property];
  },
});