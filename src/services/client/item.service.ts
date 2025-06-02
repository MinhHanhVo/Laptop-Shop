import { prisma } from "config/client"

const getProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const getDetailProduct = async (id: string) => {

    const product = await prisma.product.findUnique({
        where: { id: +id }
    })
    return product;
}


export {
    getProducts, getDetailProduct
}