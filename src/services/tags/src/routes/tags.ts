import { Router } from "express";
import TagsController from "../controllers/tags";

const router: Router = Router();
router.route("/tags").get(TagsController.getAllTags);

export default router;
