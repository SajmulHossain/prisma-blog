import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router()

router.get("/", UserControllers.getUsers)
router.get("/:id", UserControllers.getSingleUser)
router.post("/", UserControllers.createUser)

export const UserRouters = router;