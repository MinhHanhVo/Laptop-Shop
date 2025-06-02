import { Request, Response } from "express";
import { createProduct, getViewProductById, handleDeleteProduct, updateProductById } from "services/admin/product.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const getAdminCreateProductPage = async (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
        factory: "",
        target: ""
    }
    return res.render("admin/product/create.ejs", {
        errors, oldData
    })
}
const postAdminCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity,
        factory, target } = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        //error
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.message} (${item.path[0]})`);
        const oldData = {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target
        }
        return res.render("admin/product/create.ejs", {
            errors, oldData
        })
    }
    const file = req.file;
    const image = file?.filename ?? "";
    await createProduct(name, price, detailDesc, shortDesc, quantity, factory, target, image);
    return res.redirect("/admin/product");

}
const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    // handle delete user
    await handleDeleteProduct(id);
    return res.redirect("/admin/product");
}
const getViewProduct = async (req: Request, res: Response) => {
    const errors = [];
    const { id } = req.params;
    // get user by id
    const product = await getViewProductById(id);
    const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];

    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];

    return res.render("admin/product/detail.ejs",
        {
            product,
            errors,
            factoryOptions,
            targetOptions
        });

}
const postUpdateProduct = async (req: Request, res: Response) => {
    const { id, name, price, detailDesc, shortDesc, quantity,
        factory, target } = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        //error
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.message} (${item.path[0]})`);
        // 🔁 Lấy lại product để truyền cho view
        const product = await getViewProductById(id);

        // 🔁 Truyền lại các lựa chọn cho dropdown
        const factoryOptions = [
            { name: "Apple (MacBook)", value: "APPLE" },
            { name: "Asus", value: "ASUS" },
            { name: "Lenovo", value: "LENOVO" },
            { name: "Dell", value: "DELL" },
            { name: "LG", value: "LG" },
            { name: "Acer", value: "ACER" },
        ];

        const targetOptions = [
            { name: "Gaming", value: "GAMING" },
            { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
            { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
            { name: "Mỏng nhẹ", value: "MONG-NHE" },
            { name: "Doanh nhân", value: "DOANH-NHAN" },
        ];

        // 🔁 Gộp lại các giá trị nhập trước để hiện lại trong form
        const oldData = {
            id,
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target,
            image: product?.image ?? ""
        };

        return res.render("admin/product/detail.ejs", {
            errors,
            product: oldData,
            factoryOptions,
            targetOptions
        });
    }

    const file = req.file;
    const image = file?.filename ?? undefined;

    //update user 
    await updateProductById(id, name, price, detailDesc, shortDesc, quantity,
        factory, target, image);


    return res.redirect("/admin/product")
}
export {
    getAdminCreateProductPage, postAdminCreateProduct, getViewProduct, postDeleteProduct, postUpdateProduct
}