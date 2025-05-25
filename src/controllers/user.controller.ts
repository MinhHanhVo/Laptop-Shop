import { Request, Response } from "express";
import { log } from "node:console";
import { getAllUsers, handleCreateUser, handleDeleteUser, getUserById, updateUserById, getAllRoles } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
    // get users
    const users = await getAllUsers();

    return res.render("home.ejs", {
        users: users
    });
}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render("admin/user/create.ejs", {
        roles
    })
}

// Tạo mới useruser
const postCreateUser = async (req: Request, res: Response) => {
    const { name, username, address, phone, role } = req.body;

    //handle create user 
    // await handleCreateUser(name, email, address);

    return res.redirect("/")
}
// Xóa useruser
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // handle delete user
    await handleDeleteUser(id);
    return res.redirect("/");

}

// Xem chi tiết user
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // get user by id
    const user = await getUserById(id);

    return res.render("view-user.ejs", { id: id, user: user });

}
// update user
const postUpdateUser = async (req: Request, res: Response) => {
    const { id, name, email, address } = req.body;

    //update user 
    await updateUserById(id, name, email, address);

    return res.redirect("/")
}
export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };
