import Users, { iUser } from "../models/users";
import { Request, Response } from "express";
import UserQuestionData, { iUserQuestionData } from "../models/userQuestionData";

export default class UsersController {
	public static async getAuthenticatedUser(req: Request, res: Response): Promise<Response> {
		try {
			const user: iUser | null = await Users.findOne({ _id: req.user?.id });
			const data: object = await UsersController.getParsedUserData(user);

			return res.status(200).json({
				message: "Successfully retrieved authenticated user",
				user: data
			});
		} catch(e) {
			return res.status(500).json({
				message: "Error(s) getting currently authenticated user info",
				errors: e
			});
		}
	}

	public static async findUserById(req: Request<{ username: string }, unknown, unknown, unknown>, res: Response): Promise<Response> {
		const username = req.params.username;
		try {
			const user: iUser | null = await Users.findOne({ username });
			const data: object = await UsersController.getParsedUserData(user);

			return res.status(200).json({
				message: "Successfully fetched user with username " + username,
				user: data
			});
		} catch(e) {
			return res.status(500).json({
				message: "Error(s) finding user by username " + username,
				errors: e
			});
		}
	}

	private static async getParsedUserData(user: iUser | null) {
		if (!user) {
			throw new Error("No user found with provided id");
		}

		const username = user.username;
		const userQuestionData: Array<iUserQuestionData> = await UserQuestionData.find({ username });
		return ({
			message: "Successfully fetched user with username " + username,
			user: {
				username,
				avatar: user.avatar,
				is_premium: user.isPremium,
				accepted: userQuestionData.filter(question => question.isCompleted).length,
				question_statuses: userQuestionData.map(question => ({
					title: question.questionTitle,
					isCompleted: question.isCompleted,
					hasBeenAttempted: question.hasBeenAttempted
				}))
			}
		});
	}
}