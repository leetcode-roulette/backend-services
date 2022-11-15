import mongoose, { Model, Schema } from "mongoose";

export interface iUser {
	_id: number;
	username: string;
	avatar: string;
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
