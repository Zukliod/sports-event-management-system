import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Force Node to pinpoint the exact directory where this config file lives
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load the .env file using its absolute file-system path
config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // 🔒 Fully secure dynamic lookup using the type-safe Prisma 7 macro
    url: env("DATABASE_URL"),
  },
});