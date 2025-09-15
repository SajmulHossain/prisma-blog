import { Request, Response } from "express";
import { PostServices } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.createPost(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.getPosts();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.deletePost(req.params.id);
    return result;
  } catch (error) {
    res.status(500).json(error);
  }
};

export const PostControllers = {
  createPost,
  getPosts,
  deletePost
};
