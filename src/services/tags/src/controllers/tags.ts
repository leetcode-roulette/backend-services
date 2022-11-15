import { Request, Response } from "express";
import { Tags, iTag } from "../models/tags";
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
				.limit(limit)
				.sort(TagsController.getParsedSortString(req.query.sort));
			const total: number = await Tags.countDocuments();
			const totalPages: number = Math.ceil(total / limit) || 1;

			return res.status(200).json({
				message: "Successfully retrieved tags",
				tags: TagsController.getParsedTagData(data),
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

	private static getParsedTagData(tags: Array<iTag>): Array<object> {
		return tags.map(tag => ({
			name: tag.name,
			slug: tag.slug,
			number_of_problems: tag.numberOfProblems
		}));
	}

	private static getParsedSortString(sortString: string): string {
		const validSortStrings: Set<string> = new Set(["tagSlug", "name", "numberOfProblems"]);

		if (validSortStrings.has(sortString)) {
			return sortString;
		}

		return "numberOfProblems";
	}
}
