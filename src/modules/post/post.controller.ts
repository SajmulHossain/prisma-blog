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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured ? req.query.isFeatured === 'true' : undefined;
    
    const result = await PostServices.getPosts({ page, limit, search, isFeatured });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.getSinglePost(req.params.id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.deletePost(req.params.id);
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.updatePost(req.params.id, req.body);
    res.status(202).json(result)
  } catch (error) {
    res.status(500).json(error);
  }
};

export const PostControllers = {
  createPost,
  getPosts,
  getSinglePost,
  deletePost,
  updatePost
};
