import mongoose, { Model, Schema } from "mongoose";

export interface ITag {
	tagSlug: string;
	name: string;
	numberOfProblems: number;
}

const TagSchema: Schema<ITag> = new Schema({
	tagSlug: { type: "string", unique: true, required: true },
	name: { type: "string", required: true },
	numberOfProblems: { type: "number", required: true }
});

export const Tags: Model<ITag> = mongoose.model("tags", TagSchema);
