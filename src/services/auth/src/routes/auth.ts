import { Router } from "express";
import AuthController from "../controllers/auth";

const authRouter: Router = Router();
authRouter.route("/sync").post(AuthController.sync);
authRouter.route("/logout").post(AuthController.logout);

export default authRouter;
