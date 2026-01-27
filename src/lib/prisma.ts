import { PrismaClient } from "../generated/prisma/client";

type PrismaClientType = InstanceType<typeof PrismaClient>;

const globalForPrisma = global as unknown as { prisma?: PrismaClientType };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prisma: PrismaClientType = globalForPrisma.prisma || new (PrismaClient as any)({});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
