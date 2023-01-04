import mongoose, { Model, Schema } from "mongoose";

/**
 * Interface for question to tag relations.
 */
export interface iQuestionTag {

	/**
	 * Number value indicating a questions id. Used to map back to a question.
	 */
	questionId: number;

	/**
	 * String value indicating a tags slug. Used to map back to a tag.
	 */
	tagSlug: string;

}

const QuestionTagSchema: Schema<iQuestionTag> = new Schema({
	questionId: { type: "number", unique: true, required: true },
	tagSlug: { type: "string", unique: true, required: true },
});

export const QuestionTags: Model<iQuestionTag> = mongoose.model("questionTags", QuestionTagSchema);
