import mongoose, { Model, Schema } from "mongoose";

export interface iUserQuestionData {
	username: string;
	questionTitle: string;
	isCompleted: boolean;
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
