import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from 'bcrypt';
const saltRounds = 10;


const hashPassword = async (plainText: string) => {
    return await bcrypt.hash(plainText, saltRounds)
}

const comparePassword = async (plainText: string, hashPassword: string) => {
    return await bcrypt.compare(plainText, hashPassword)
}

// create user
const handleCreateUser = async (
    name: string,
    email: string,
    address: string,
    phone: string,
    avatar: string,
    role: string
) => {
    const defaullPassword = await hashPassword("123456");
    return await prisma.user.create({
        data: {
            fullName: name,
            username: email,
            address: address,
            password: defaullPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar,
            phone: phone,
            roleId: +role

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

const updateUserById = async (id: string, name: string, phone: string, role: string, address: string, avatar: string) => {
    return await prisma.user.update({
        where: { id: +id },
        data: {
            fullName: name,
            phone: phone,
            roleId: +role,
            address: address,
            ...(avatar !== undefined && { avatar: avatar })
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

export {
    handleCreateUser, getAllUsers, handleDeleteUser, getUserById,
    updateUserById, getAllRoles, hashPassword, comparePassword
};