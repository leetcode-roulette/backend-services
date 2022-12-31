import { Request, Response } from "express";
import { Query } from "./query";
import { Questions, iQuestion } from "../models/questions";
import { UserQuestionStatuses, iUserQuestionStatus } from "../models/userQuestionStatuses";
import { ExpressQuery } from "./interfaces/query";
import { QuestionData } from "./interfaces/questionData";

/**
 * `QuestionsController` class for all question related business logic.
 */
export default class QuestionsController {

	/**
	 * Retrieves all questions stored in the `questions` collection.
	 * @param req - Express Request object.
	 * @param res - Express Response object.
	 */
	public static async getAllQuestions(req: Request<unknown, unknown, unknown, ExpressQuery>, res: Response) {
		const limit = req.query.limit;
		const page = req.query.page;
		const userId: number | null = req.cookies.userId;

		try {
			const query: Query = new Query(req.query);
			const questions: Array<iQuestion> = await Questions.find(await query.getQuery)
				.sort(this.getParsedSortString(req.query.sort))
				.limit(limit)
				.skip((page - 1) * limit);
			const userQuestionStatuses: Array<iUserQuestionStatus> = await UserQuestionStatuses.find({ userId });
			const statuses: {[key: number]: iUserQuestionStatus} = {};
			userQuestionStatuses.forEach(status => statuses[status.questionId] = status);
			const parsedQuestions = questions.map(question => this.getParsedQuestion(question, statuses[question._id]));

			res.status(200).json({
				message: "Successfully retrieved questions",
				questions: parsedQuestions
			});
		} catch(e) {
			res.status(500).json({
				message: "Error(s) attempting to get questions.",
				errors: e
			});
		}
	}

	/**
	 * Retrieves a question by its associated question slug.
	 * @param req - Express Request object.
	 * @param res - Express Response object.
	 */
	public static async getQuestionBySlug(req: Request, res: Response) {
		const slug: string = req.params.slug;
		const userId: number | null = req.cookies.userId;

		try {
			const question: iQuestion | null = await Questions.findOne({ slug: req.params.slug });
			const userQuestionStatus: iUserQuestionStatus | null = await UserQuestionStatuses.findOne({ slug, userId });

			if (question === null) {
				throw new Error("No problem found with provided title slug.");
			}

			const parsedQuestion: QuestionData = this.getParsedQuestion(question, userQuestionStatus);

			res.status(200).json({
				message: "Successfully retrieved question by slug.",
				question: parsedQuestion
			});
		} catch(e) {
			res.status(500).json({
				message: "Error(s) attempting to get question by slug.",
				errors: e
			});
		}
	}

	private static getParsedSortString(sortString: string): string {
		const validStrings: Set<string> = new Set(["-difficulty", "-title", "-_id"]);

		if (validStrings.has(sortString) || validStrings.has("-" + sortString)) {
			return sortString;
		}

		return "_id";
	}

	private static getParsedQuestion(question: iQuestion, questionStatus?: iUserQuestionStatus | null): QuestionData {
		const parsedQuestion: QuestionData = {
			title: question.title,
			title_slug: question.slug,
			tags: question.tags,
			id: question._id,
			frontend_id: question.frontendId,
			difficulty: question.difficulty,
			premium: question.isPremium,
			description: question.content,
			hints: question.hints,
			accepted: question.accepted,
			submitted: question.submissions,
			acceptance_rate: question.accepted / question.submissions,
			completed: false,
			attempted: false
		};

		if (questionStatus) {
			parsedQuestion.completed = questionStatus.isCompleted;
			parsedQuestion.attempted = questionStatus.hasBeenAttempted;
		}

		return parsedQuestion;
	}
}
