import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production, reuse the Prisma client instance for performance reasons
  prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
  if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
} else {
  // In development mode, always create a new Prisma client instance
  prisma = prismaClientSingleton();
}

export default prisma;

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
