import mongoose, { Model, Schema } from "mongoose";

/**
 * Interface for a tag that is saved in the database.
 */
export interface iTag {

  /**
   * String value representing a tags slug.
   */
	slug: string;

  /**
   * String value representing a tags name.
   */
	name: string;

}

const TagSchema: Schema<iTag> = new Schema({
	slug: { type: "string", unique: true, required: true },
	name: { type: "string", required: true }
});

export const Tags: Model<iTag> = mongoose.model("tags", TagSchema);
