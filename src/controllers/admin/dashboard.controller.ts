import exp from "constants";
import { Request, Response } from "express";
import { getAllUsers } from "services/user.service";
const getDashboardPage = async (req: Request, res: Response) => {

    return res.render("admin/dashboard/show.ejs");
}
const getAdminUserPage = async (req: Request, res: Response) => {
    // get users
    const users = await getAllUsers();
    return res.render("admin/user/show.ejs", {
        users: users
    });
}
const getAdminOrderPage = async (req: Request, res: Response) => {

    return res.render("admin/order/show.ejs");
}
const getAdminProductPage = async (req: Request, res: Response) => {

    return res.render("admin/product/show.ejs");
}
export { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage }