import mongoose, { Model, Schema } from "mongoose";

/**
 * Interface for a user that is saved in the database.
 */
export interface iUser {

  /**
   * Number value indicating a users user id.
   */
	_id: number;

  /**
   * String value indicating a users username.
   */
	username: string;

  /**
   * String value indicating the url locating of a users avatar.
   */
	avatar: string;

  /**
   * Boolean value indicating if a user is a premium user or not.
   */
	isPremium: boolean;
  
}

const UserSchema: Schema<iUser> = new Schema({
	_id: { type: "number" },
	username: { type: "string", unique: true, required: true },
	avatar: { type: "string", required: true },
	isPremium: { type: "Boolean", required: true }
});

const Users: Model<iUser> = mongoose.model("users", UserSchema);
export default Users;
