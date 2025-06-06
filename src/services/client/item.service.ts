import { prisma } from "config/client"
import { any } from "zod";

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

const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    })

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })

    if (cart) {
        // update
        // update sum gio hang
        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                sum: {
                    increment: quantity,
                }
            }

        })


        // update cartDetail
        // nếu chưa có tạo mới, nếu có rồi cập nhật quantity
        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                cartId: cart.id,
                productId: productId
            }
        })


        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0
            },
            update: {
                quantity: {
                    increment: quantity,
                }
            },
            create: {
                price: product.price,
                quantity: quantity,
                productId: productId,
                cartId: cart.id
            },
        })


    } else {
        // create
        await prisma.cart.create({
            data: {
                sum: quantity,
                userId: user.id,
                cardDetails: {
                    create: [
                        {
                            price: product.price,
                            quantity: quantity,
                            productId: productId
                        }
                    ]
                }
            }
        })
    }
}

const getProductInCart = async (userId: number) => {
    const cart = await prisma.cart.findUnique({
        where: { userId }
    })

    if (cart) {
        const currentCartDetail = await prisma.cartDetail.findMany({
            where: { cartId: cart.id },
            include: { Product: true }
        })
        return currentCartDetail;
    }
    return [];

}

export {
    getProducts, getDetailProduct, addProductToCart, getProductInCart
}