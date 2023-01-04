import { ExpressQuery, MongooseQuery, Difficulty } from "./interfaces/query";
import { iQuestionTag, QuestionTags } from "../models/questionTags";
import { boolean } from "webidl-conversions";

export class Query {
	private mongooseQuery: MongooseQuery = {};
	private query: ExpressQuery;

	constructor(query: ExpressQuery) {
		this.query = query;
	}

	public async initializeMongooseQuery(): Promise<void> {
		this.getDifficulties(this.query.difficulty);
		this.getPremiumStatus(this.query.premium);
		this.getSearch(this.query.q);
		await this.getQuestionsByTags(this.query.tags);
	}

	public async getQuery(): Promise<MongooseQuery> {
		if (Object.keys(this.mongooseQuery).length === 0) {
			await this.initializeMongooseQuery();
		}

		return this.mongooseQuery;
	}

	private getDifficulties(difficultiesQuery: string): void {
		const difficulty: Difficulty = {
			$in: [],
		};

		if (!difficultiesQuery) {
			return;
		}

		difficultiesQuery.split(",").forEach((difficultyQuery) => {
			if (this.isValidDifficulty(difficultyQuery)) {
				difficulty.$in.push(this.getDifficulty(difficultyQuery));
			}
		});

		this.mongooseQuery.difficulty = difficulty;
	}

	private isValidDifficulty(difficulty: string): boolean {
		const d = difficulty.toLowerCase();
		const valid = ["1", "2", "3", "easy", "medium", "hard"];

		for (let i = 0; i < valid.length; i++) {
			if (d === valid[i]) return true;
		}

		return false;
	}

	private getDifficulty(difficulty: string): number {
		switch (difficulty.toLowerCase()) {
		case "easy":
			return 1;
		case "medium":
			return 2;
		case "hard":
			return 3;
		}

		return parseInt(difficulty);
	}

	private getPremiumStatus(premium: boolean | undefined): void {
		if (!boolean(premium)) {
			this.mongooseQuery.isPremium = false;
		}
	}

	private getSearch(search: string): void {
		if (!search) {
			return;
		}

		this.mongooseQuery.title = { $regex: search.split(",").join("|"), $options: "i" };
	}

	private async getQuestionsByTags(tags: string | undefined): Promise<void> {
		if (!tags) {
			return;
		}

		try {
			const questionIds: Array<number> = await this.getQuestionIds(tags.split(","));
			this.mongooseQuery._id = { $in: questionIds };
		} catch (e) {
			throw new Error("Exception caught getting problemIds " + e);
		}
	}

	private async getQuestionIds(tags: string[]): Promise<number[]> {
		const questionIds: number[] = [];

		try {
			const questionTags: iQuestionTag[] = await QuestionTags.find({ tagSlug: { $in: tags } });
			questionTags.forEach((questionTag) => {
				questionIds.push(questionTag.questionId);
			});
		} catch (e) {
			throw new Error("Exception caught executing processes " + e);
		}

		return questionIds;
	}
}
