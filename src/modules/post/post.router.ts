import { Router } from "express";
import { PostControllers } from "./post.controller";

const router = Router();

router.get("/", PostControllers.getPosts);
router.post("/", PostControllers.createPost);
router.get("/:id", PostControllers.getSinglePost);
router.delete("/id", PostControllers.deletePost);
router.patch("/id", PostControllers.updatePost);

export const PostRouters = router;
