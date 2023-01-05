import mongoose, { Model, Schema } from "mongoose";

/**
 * Interface for a question tag that is saved in the database.
 */
export interface iQuestionTag {

  /**
   * String value indicating the associated slug for a tag. Used to map back to tag.
   */
	slug: string;

  /**
   * Number value indicating the associated id for a question. Used to map back to question.
   */
	questionId: number;
  
}

const QuestionTagSchema: Schema<iQuestionTag> = new Schema({
	slug: { type: "string", unique: true, required: true },
	questionId: { type: "number", required: true }
});

export const QuestionTags: Model<iQuestionTag> = mongoose.model("questionTags", QuestionTagSchema);
