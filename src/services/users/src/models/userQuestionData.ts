import mongoose, { Model, Schema } from "mongoose";

/**
 * Interface for the status of a question for a given user.
 */
export interface iUserQuestionData {

	/**
	 * String value indicating an associated users username. Used to map back to a given user.
	 */
	username: string;

	/**
	 * Number value indicating the associated questions id.
	 */
	questionId: number;

	/**
	 * String value indicating a questions title. Used to map back to a given question.
	 */
	questionTitle: string;

	/**
	 * Number value indicating the difficulty of a question.
	 */
	questionDifficulty: number;

	/**
	 * Boolean value indicating the completion status of a question.
	 */
	isCompleted: boolean;

	/**
	 * Boolean value indicating if a question has been attempted.
	 */
	hasBeenAttempted: boolean;

}

const UserQuestionDataSchema: Schema<iUserQuestionData> = new Schema({
	username: { type: "string", required: true },
	questionId: { type: "number", required: true },
	questionTitle: { type: "string", required: true },
	questionDifficulty: { type: "number", required: true },
	isCompleted: { type: "boolean", required: true },
	hasBeenAttempted: { type: "boolean", required: true }
});

const UserQuestionData: Model<iUserQuestionData> = mongoose.model("userQuestionData", UserQuestionDataSchema);
export default UserQuestionData;
