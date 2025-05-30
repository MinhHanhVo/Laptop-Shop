import { name } from "ejs";
import { prisma } from "./client";
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "./constant";

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
    }
    if (countUser === 0) {
        const defaullPassword = await hashPassword("123456");
        const adminRole = await prisma.role.findFirst({
            where: { name: "ADMIN" }
        })
        if (adminRole)
            await prisma.user.createMany({
                data: [
                    {
                        fullName: "Minh Hanh",
                        username: "minhhanh@gmail.com",
                        password: defaullPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    },
                    {
                        fullName: "Admin",
                        username: "admin@gmail.com",
                        password: defaullPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    }]
            })
    }
    if (countRole !== 0 && countUser !== 0) {
        console.log(">>> Already init data ");
    }

}
export default initDatabase;