import { name } from "ejs";
import { prisma } from "./client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin thi full quyen"
                },
                {
                    name: "USER",
                    description: "User thi thong thuong"
                }
            ]
        })
    } else if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "minhhanh@gmail.com",
                    password: "123456",
                    accountType: "SYSTEM"
                },
                {
                    username: "admin@gmail.com",
                    password: "123456",
                    accountType: "SYSTEM"
                }]
        })
    } else {
        console.log(">>> Already init data ");

    }

}
export default initDatabase;