import mongoose, { Model, Schema } from "mongoose";

/**
 * Interface for the status of a question for a given user.
 */
export interface iUserQuestionStatus {

	/**
	 * Number value indicating an associated users user id. Used to map back to a given user.
	 */
	userId: number;

	/**
	 * Number value indicating a questions id. Used to map back to a given question.
	 */
	questionId: number;

	/**
	 * Boolean value indicating the completion status of a question.
	 */
	isCompleted: boolean;

	/**
	 * Boolean value indicating if a question has been attempted.
	 */
	hasBeenAttempted: boolean;

}

const UserQuestionStatusSchema: Schema<iUserQuestionStatus> = new Schema({
	userId: { type: "number", required: true },
	questionId: { type: "number", required: true },
	isCompleted: { type: "boolean", required: true },
	hasBeenAttempted: { type: "boolean", required: true }
});

export const UserQuestionStatuses: Model<iUserQuestionStatus> = mongoose.model("userQuestionStatuses", UserQuestionStatusSchema);
