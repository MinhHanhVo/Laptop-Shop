import { prisma } from "config/client";
import { TOTAL_ITEM_PER_PAGE } from "config/constant";
const getOrderAdmin = async (page: number) => {
    const pageSize = TOTAL_ITEM_PER_PAGE;
    const skip = (page - 1) * pageSize;
    const orders = await prisma.order.findMany({
        skip: skip,
        take: pageSize,
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
const countTotalOrderPages = async () => {
    const pageSize = TOTAL_ITEM_PER_PAGE;
    const totalItems = await prisma.order.count();

    const totalPages = Math.ceil(totalItems / pageSize);
    return totalPages;

}
export {
    getOrderAdmin, getViewOrderDetail, countTotalOrderPages
}