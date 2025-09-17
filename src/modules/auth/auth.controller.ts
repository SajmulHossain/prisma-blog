import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginWithGoogle = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.loginWithGoogle(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const AuthController = {
  login,
  loginWithGoogle
};
