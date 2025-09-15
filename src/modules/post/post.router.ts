import { Router } from "express";
import { PostControllers } from "./post.controller";

const router = Router();

router.get("/", PostControllers.getPosts);
router.post("/", PostControllers.createPost);
router.delete("/", PostControllers.deletePost);

export const PostRouters = router;
