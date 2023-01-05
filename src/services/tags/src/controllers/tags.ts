import { Request, Response } from "express";
import { Tags, iTag } from "../models/tags";
import { QuestionTags, iQuestionTag } from "../models/questionTags";
import { ParsedTag } from "./interfaces/tags";
import { Query } from "./interfaces/query";

/**
 * `TagsController` class for all tag related business logic.
 */
export default class TagsController {

	/**
	 * Retrieves all tags stored in the `tags` collection
	 * @param req - Express Request object
	 * @param res - Express Response object
	 */
	public static async getAllTags(req: Request<unknown, unknown, unknown, Query>, res: Response): Promise<Response> {
		const limit = req.query.limit;
		const page = req.query.page;

		try {
			const data: Array<iTag> = await Tags.find()
				.limit(limit);
			const questionTags: Array<iQuestionTag> = await QuestionTags.find();
			const total: number = await Tags.countDocuments();
			const totalPages: number = Math.ceil(total / limit) || 1;

			return res.status(200).json({
				message: "Successfully retrieved tags",
				tags: TagsController.getParsedTagData(data, questionTags),
				paging: {
					total,
					page,
					pages: totalPages
				}
			});
		} catch(e) {
			return res.status(500).json({
				message: "Unexpected error caught retrieving tags",
				error: e
			});
		}
	}

	private static getParsedTagData(tags: Array<iTag>, questionTags: Array<iQuestionTag>): Array<ParsedTag> {
		const numberOfQuestions = this.getNumberOfQuestions(questionTags);

		return tags.map(tag => ({
			name: tag.name,
			slug: tag.slug,
			number_of_questions: numberOfQuestions[tag.slug]
		})).sort((a, b) => a.number_of_questions - b.number_of_questions );
	}

	private static getNumberOfQuestions(questionTags: Array<iQuestionTag>): {[key: string]: number} {
		const numberOfQuestions: {[key: string]: number} = {};

		questionTags.forEach(questionTag => {
			const slug = questionTag.slug;

			if (!(slug in numberOfQuestions)) {
				numberOfQuestions[slug] = 0;
			}

			numberOfQuestions[slug]++;
		});

		return numberOfQuestions;
	}
}
