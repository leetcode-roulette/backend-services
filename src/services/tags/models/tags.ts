import mongoose, { Model, Schema } from "mongoose";

export interface iTag {
	slug: string;
	name: string;
	numberOfProblems: number;
}

const TagSchema: Schema<iTag> = new Schema({
	slug: { type: "string", unique: true, required: true },
	name: { type: "string", required: true },
	numberOfProblems: { type: "number", required: true }
});

export const Tags: Model<iTag> = mongoose.model("tags", TagSchema);
