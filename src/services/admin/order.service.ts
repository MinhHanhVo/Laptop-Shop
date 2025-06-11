import { prisma } from "config/client";
const getOrderAdmin = async () => {
    const orders = await prisma.order.findMany({
        include: {
            User: true
        }
    });
    return orders;
}
const getViewOrderDetail = async (orderId: number) => {
    return await prisma.oderDetail.findMany({
        where: {
            orderId
        },
        include: {
            Product: true
        }
    })
}
export {
    getOrderAdmin, getViewOrderDetail
}