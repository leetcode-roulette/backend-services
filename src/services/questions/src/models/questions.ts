import mongoose, { Model, Schema } from "mongoose";

/**
 * Interface for a leetcode question.
 */
export interface iQuestion {

	/**
	 * Number value indicating a questions id.
	 */
	_id: number;

	/**
	 * Number value indicating a questions frontend id. The value that appears for the leetcode question number.
	 */
	frontendId: number;

	/**
	 * String value indicating a questions title.
	 */
	title: string;

	/**
	 * String value indicating a questions title slug. The value that appears in a questions url.
	 */
	slug: string;

	/**
	 * Number value indicating a questions difficulty.
	 */
	difficulty: number;

	/**
	 * Array of associated tags for a question.
	 */
	tags: Array<string>;

	/**
	 * String value indicating a questions description.
	 */
	content: string;

	/**
	 * Boolean value indicating a question is premium.
	 */
	isPremium: boolean;

	/**
	 * Number value indicating the number of accepted solutions.
	 */
	accepted: number;

	/**
	 * Number value indicating the number of submissions.
	 */
	submissions: number;

	/**
	 * Array of hints for a question.
	 */
	hints: Array<string>;
}

const QuestionSchema: Schema<iQuestion> = new Schema({
	_id: { type: "number", unique: true, required: true },
	frontendId: { type: "number", required: true },
	title: { type: "string", unique: true, "required": true },
	slug: { type: "string", unique: true, required: true },
	difficulty: { type: "number", required: true },
	tags: { type: ["string"], required: true },
	content: { type: "string", required: true },
	isPremium: { type: "boolean", required: true },
	accepted: { type: "number", required: true },
	submissions: { type: "number", required: true },
	hints: { type: ["string"], required: true }
});

export const Questions: Model<iQuestion> = mongoose.model("questions", QuestionSchema);
