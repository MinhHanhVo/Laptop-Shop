import exp from "constants";
import { Request, Response } from "express";
import { getDashboardInfo } from "services/admin/dashboard.service";
import { getOrderAdmin, getViewOrderDetail } from "services/admin/order.service";
import { getAllProducts } from "services/admin/product.service";
import { getAllUsers } from "services/user.service";
const getDashboardPage = async (req: Request, res: Response) => {
    const info = await getDashboardInfo()
    return res.render("admin/dashboard/show.ejs", {
        info
    });
}
const getAdminUserPage = async (req: Request, res: Response) => {
    // get users
    const users = await getAllUsers();
    return res.render("admin/user/show.ejs", {
        users: users
    });
}
const getAdminOrderPage = async (req: Request, res: Response) => {

    const orders = await getOrderAdmin();
    return res.render("admin/order/show.ejs", {
        orders
    });
}

const getAdminOrderDetailPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const orderDetails = await getViewOrderDetail(+id);
    return res.render("admin/order/detail.ejs", {
        orderDetails
    });
}

const getAdminProductPage = async (req: Request, res: Response) => {
    const products = await getAllProducts();
    return res.render("admin/product/show.ejs", {
        products
    });
}
export { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage, getAdminOrderDetailPage }