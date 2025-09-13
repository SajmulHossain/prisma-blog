import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connectDB = async() => {
    try {
        await prisma.$connect();
        console.log("Database Connected");
    } catch (error) {
        console.log("DB Connection Failed");
        process.exit(1);
    }
}