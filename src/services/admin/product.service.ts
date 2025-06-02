import { prisma } from "config/client";

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

const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
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
    createProduct, getAllProducts, handleDeleteProduct, getViewProductById, updateProductById
}