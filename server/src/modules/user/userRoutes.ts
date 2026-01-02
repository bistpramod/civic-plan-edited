import { Router } from "express";
import * as userController from "./userController";

const router = Router();

router.get("/get-users", userController.getUsers);

export default router;
