import { Router } from "express";
import userRouter from "./users";

const router: Router = Router();
router.use("/", userRouter);

export default router;
