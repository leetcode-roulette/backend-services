import { Router } from "express";
import QuestionsController from "../controllers/questions";

const router: Router = Router();
router.route("/questions").get(QuestionsController.getAllQuestions);
router.route("/questions/:slug").get(QuestionsController.getQuestionBySlug);

export default router;
