import { Router } from "express";
import { PostControllers } from "./post.controller";

const router = Router();

router.get("/", PostControllers.getPosts);
router.post("/", PostControllers.createPost);
router.get("/state", PostControllers.getState);
router.patch("/:id", PostControllers.updatePost);
router.get("/:id", PostControllers.getSinglePost);
router.delete("/:id", PostControllers.deletePost);

export const PostRouters = router;
