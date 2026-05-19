import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "production" ? [] : ["query"],
});
export default prisma;