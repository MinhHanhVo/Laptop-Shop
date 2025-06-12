import { prisma } from "config/client";
import { TOTAL_ITEM_PER_PAGE } from "config/constant";

const createProduct = async (name: string, price: number, detailDesc: string, shortDesc: string,
    quantity: number, factory: string, target: string, image: string
) => {
    return await prisma.product.create({
        data: {
            name: name,
            price: +price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: +quantity,
            factory: factory,
            target: target,
            ...(image !== undefined && { image: image })
        }
    })
}

const getAllProducts = async (page: number) => {
    const pageSize = TOTAL_ITEM_PER_PAGE;
    const skip = (page - 1) * pageSize;
    const products = await prisma.product.findMany({
        skip: skip,
        take: pageSize
    });
    return products;
}
const countTotalProductPages = async () => {

    const pageSize = TOTAL_ITEM_PER_PAGE;
    const totalItems = await prisma.product.count();

    const totalPages = Math.ceil(totalItems / pageSize);
    return totalPages;

}


const handleDeleteProduct = async (id: string) => {
    await prisma.product.delete({
        where: {
            id: +id
        }
    })
}

const getViewProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id: +id }
    })
    return product;
}

const updateProductById = async (id: string, name: string, price: number, detailDesc: string, shortDesc: string,
    quantity: number, factory: string, target: string, image: string) => {
    return await prisma.product.update({
        where: { id: +id },
        data: {
            name: name,
            price: +price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: +quantity,
            factory: factory,
            target: target,
            ...(image !== undefined && { image: image })
        }
    })

}
export {
    createProduct, getAllProducts, handleDeleteProduct, getViewProductById, updateProductById, countTotalProductPages
}