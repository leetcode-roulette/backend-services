import { Router } from "express";
import isAuthorized from "../middleware/isAutherized";
import UsersController from "../controllers/users";

const userRouter: Router = Router();
userRouter.route("/").get(isAuthorized, UsersController.getAuthenticatedUser);
userRouter.route("/users/:username").get(UsersController.findUserByUsername);

export default userRouter;
