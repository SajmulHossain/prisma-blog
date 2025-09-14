import { Router } from "express";
import { PostControllers } from "./post.controller";

const router = Router();

router.post("/", PostControllers.createPost);

export const PostRouters = router;
