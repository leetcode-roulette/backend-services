import mongoose, { Model, Schema } from "mongoose";

/**
 * Interface for the status of a question for a given user.
 */
export interface iUserQuestionData {

  /**
   * String value indicating the associated users username. Used to map back to a given user.
   */
	username: string;

  /**
   * String value indicating the questions title. Used to map back to a given question.
   */
	questionTitle: string;

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
	questionTitle: { type: "string", required: true },
	isCompleted: { type: "boolean", required: true },
	hasBeenAttempted: { type: "boolean", required: true }
});

const UserQuestionData: Model<iUserQuestionData> = mongoose.model("userQuestionData", UserQuestionDataSchema);
export default UserQuestionData;
