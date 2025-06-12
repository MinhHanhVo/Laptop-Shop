import { Request, Response } from "express";
import { countTotalProductClientPages, getProducts } from "services/client/item.service";
import { getProductWithFilter, userFilter } from "services/client/product.filter";
import { handleCreateUser, handleDeleteUser, getUserById, updateUserById, getAllRoles } from "services/user.service";
import { date } from "zod";

const getHomePage = async (req: Request, res: Response) => {

    const { page } = req.query;
    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;
    const totalPages = await countTotalProductClientPages(8);
    const products = await getProducts(currentPage, 8);
    return res.render("client/home/show.ejs",
        {
            products,
            totalPages,
            page: currentPage
        }
    );
}

const getProductFilterPage = async (req: Request, res: Response) => {
    const { page, factory = "", target = "", price = "", sort = "" }
        = req.query as {
            page?: string;
            factory: string;
            target: string;
            price: string;
            sort: string;
        };

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;

    // const totalPages = await countTotalProductClientPages(9);
    // const products = await getProducts(currentPage, 9);

    const data = await getProductWithFilter(currentPage, 9, factory, target, price, sort);

    return res.render("client/product/filter.ejs",
        {
            products: data.products,
            totalPages: +data.totalPages,
            page: currentPage
        }
    );
}


const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render("admin/user/create.ejs", {
        roles
    })
}


// Tạo mới user
const postCreateUser = async (req: Request, res: Response) => {
    const { name, username, address, phone, role } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? "";
    await handleCreateUser(name, username, address, phone, avatar, role);

    return res.redirect("/admin/user")
}
// Xóa user
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // handle delete user
    await handleDeleteUser(id);
    return res.redirect("/admin/user");

}

// Xem chi tiết user
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // get user by id
    const user = await getUserById(id);
    const roles = await getAllRoles();

    return res.render("admin/user/detail.ejs",
        {
            id: id,
            user: user,
            roles
        });

}
// update user
const postUpdateUser = async (req: Request, res: Response) => {
    const { id, name, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? undefined;

    //update user 
    await updateUserById(id, name, phone, role, address, avatar);

    return res.redirect("/admin/user")
}
export {
    getHomePage, getCreateUserPage, postCreateUser,
    getProductFilterPage, postDeleteUser, getViewUser, postUpdateUser
};
