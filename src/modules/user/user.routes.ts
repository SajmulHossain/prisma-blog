import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router()

router.get("/", UserControllers.getUsers)
router.post("/", UserControllers.createUser)
router.get("/:id", UserControllers.getSingleUser)
router.delete("/:id", UserControllers.deleteUser);

export const UserRouters = router;