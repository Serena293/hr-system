import { PrismaClient, Role, JobTitle } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const adminEmail = "admin@ziggy.com";

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });
    if (!existingAdmin) { 
        const hashedPassword = await bcrypt.hash("admin123", 10);
       
        await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                firstName: "Admin",
                lastName: "User",
                role: Role.ADMIN,
                jobTitle: JobTitle.FULLSTACK_DEVELOPER,
            },
        });
        console.log("Admin User created");
    } else {
        console.log("Admin user already exists");
    }}

    main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });