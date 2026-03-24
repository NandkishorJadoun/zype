import { env } from "../schemas/env.schema";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = env.NODE_ENV === 'test'
    ? env.TEST_DATABASE_URL
    : env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };