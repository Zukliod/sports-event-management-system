import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Initialize the Prisma 7 specific PostgreSQL Driver Adapter
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Pass the adapter directly into the constructor wrapper
export const prisma = new PrismaClient({ adapter });