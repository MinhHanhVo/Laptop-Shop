import express, { Express } from "express";
import { getCreateUserPage, getHomePage, getViewUser, postCreateUser, postDeleteUser, postUpdateUser } from "controllers/user.controller";
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from "controllers/admin/dashboard.controller";
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


const router = express.Router();

const webRoutes = (app: Express) => {
    router.get("/", getHomePage);

    router.post('/handle-delete-user/:id', postDeleteUser)
    router.get('/handle-view-user/:id', getViewUser)
    router.post('/handle-update-user', postUpdateUser)


    // admin routes
    router.get("/admin", getDashboardPage);
    router.get("/admin/user", getAdminUserPage);
    router.get('/admin/create-user', getCreateUserPage)
    // router.post('/admin/handle-create-user', postCreateUser)
    router.post('/admin/handle-create-user', upload.single('avatar'), (req, res) => {
        res.send("ok")
    })

    router.get("/admin/order", getAdminOrderPage);
    router.get("/admin/product", getAdminProductPage);

    app.use("/", router);
}
export default webRoutes;