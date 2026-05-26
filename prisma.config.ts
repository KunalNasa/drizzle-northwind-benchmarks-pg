import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./src/prisma/schema.prisma",

  datasource: {
    url: env("DB_PRISMA_URL"),
  },
});

const adapter = new PrismaPg({
  connectionString: process.env.DB_PRISMA_URL,
});

export const prisma = new PrismaClient({ adapter });
