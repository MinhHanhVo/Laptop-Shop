import { createUsersApi, deleteUserById, fetchAccountAPI, getAllUsersAPI, getUserByIdAPI, loginAPI, postAddProductToCartAPI, updateUserByIdApi } from "controllers/client/api.controller";
import express, { Express } from "express";
import { checkValidJWT } from "src/middleware/jwt.middleware";


const router = express.Router();

const apiRoutes = (app: Express) => {
    router.post("/add-product-to-cart", postAddProductToCartAPI);
    router.get("/users", getAllUsersAPI);
    router.get("/users/:id", getUserByIdAPI);
    router.post("/users", createUsersApi);
    router.put("/users/:id", updateUserByIdApi);

    router.post("/login", loginAPI);
    router.get("/account", fetchAccountAPI);


    router.delete("/users/:id", deleteUserById)



    app.use("/api", checkValidJWT, router);
}
export default apiRoutes;