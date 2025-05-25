import { prisma } from "config/client";
import getConnection from "config/database";

// create user
const handleCreateUser = async (
    name: string,
    email: string,
    address: string
) => {
    return await prisma.user.create({
        data: {
            fullName: name,
            username: email,
            address: address,
            password: "",
            accountType: ""
        }
    })
}
// delete user

const handleDeleteUser = async (id: string) => {
    await prisma.user.delete({
        where: {
            id: +id
        }
    })
}

// view user

const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: +id }
    })
    return user;
}

// update user

const updateUserById = async (id: string, name: string, email: string, address: string) => {
    return await prisma.user.update({
        where: { id: +id },
        data: {
            fullName: name,
            username: email,
            address: address,
            password: "",
            accountType: ""
        }
    })
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const getAllRoles = async () => {
    const roles = await prisma.role.findMany();
    return roles;
}

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById, getAllRoles };