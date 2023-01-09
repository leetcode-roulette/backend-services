import Users, { iUser } from "../models/users";
import { Request, Response } from "express";
import UserQuestionData, { iUserQuestionData } from "../models/userQuestionData";
import { User } from "../types/custom";
import { ParsedUserData } from "./types";

/**
 * `UsersController` class for all user related business logic.
 */
export default class UsersController {

	/**
	 * Gets the currently authenticated users information.
	 * @param req - Express Request object.
	 * @param res - Express Response object.
	 */
	public static async getAuthenticatedUser(req: Request, res: Response): Promise<Response> {
		try {
			const data: object = await UsersController.getParsedUserData(req.user);

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

	/**
	 * Gets a user by the specified username param.
	 * @param req - Express Request object.
	 * @param res - Express Response object.
	 */
	public static async findUserByUsername(req: Request<{ username: string }, unknown, unknown, unknown>, res: Response): Promise<Response> {
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

	private static async getParsedUserData(user?: iUser | null | User): Promise<ParsedUserData> {
		if (!user) {
			throw new Error("No user found with provided id");
		}

		const username = user.username;
		const userQuestionData: Array<iUserQuestionData> = await UserQuestionData.find({ username });
		const completed = [0, 0, 0];
		let total = 0;

		userQuestionData.forEach(question => {
			if (question.isCompleted) {
				total++;
				completed[question.questionDifficulty]++;
			}
		});

		return ({
			username,
			avatar: user.avatar,
			is_premium: user.isPremium,
			solved: {
				total,
				easy: completed[0],
				medium: completed[1],
				hard: completed[2]
			}
		});
	}
}