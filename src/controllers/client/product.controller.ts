import { Request, Response } from "express";
import { getDetailProduct } from "services/client/item.service";

const getProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getDetailProduct(id);
    return res.render("client/product/detail.ejs", {
        product
    })
}

export {
    getProductPage
}