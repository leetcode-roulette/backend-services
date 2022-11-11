import { Request, Response } from "express";
import { Tags, ITag } from "../models/tags";
import { Query } from "./interfaces/query";

export default class TagsController {
	public static async getAllTags(req: Request<unknown, unknown, unknown, Query>, res: Response) {
		const limit = req.query.limit;
		const page = req.query.page;

		try {
			const data: Array<ITag> = await Tags.find()
				.limit(limit)
				.sort(TagsController.getParsedSortString(req.query.sort));
			const total: number = await Tags.countDocuments();
			const totalPages: number = Math.ceil(total / limit) || 1;

			res.status(200).json({
				message: "Successfully retrieved tags",
				tags: TagsController.getParsedTagData(data),
				paging: {
					total,
					page,
					pages: totalPages
				}
			});
		} catch(e) {
			res.status(500).json({
				message: "Unexpected error caught retrieving tags",
				error: e
			});
		}
	}

	private static getParsedTagData(tags: Array<ITag>): Array<object> {
		return tags.map(tag => ({
			name: tag.name,
			tag_slug: tag.tagSlug,
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
