import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser =async (req: Request, res: Response) => {
    try {
        const result = await UserServices.createUser(req.body)
        res.status(201)
        .json(result)
    } catch (error) {
        console.log(error);
    }
}

const getUsers =async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getUsers()
        res.status(200)
        .json(result)
    } catch (error) {
        console.log(error);
    }
}

const getSingleUser =async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getSingleUser(req.params.id)
        res.status(200)
        .json(result)
    } catch (error) {
        console.log(error);
    }
}

export const UserControllers = {
    createUser,
    getUsers,
    getSingleUser
}