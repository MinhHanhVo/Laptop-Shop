import { Request, Response } from "express";
import { getProducts } from "services/client/item.service";
import { handleCreateUser, handleDeleteUser, getUserById, updateUserById, getAllRoles } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
    const products = await getProducts();
    const user = req.user;
    console.log(">>> current user: ", user);

    return res.render("client/home/show.ejs",
        {
            products
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
export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };
