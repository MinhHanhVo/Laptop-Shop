
import { Request, Response } from "express";

const getRegisterPage = async (req: Request, res: Response) => {
    return res.render("client/auth/register.ejs")
}
const getLoginPage = async (req: Request, res: Response) => {
    return res.render("client/auth/login.ejs")
}


export {
    getRegisterPage, getLoginPage
}