import { Request, Response } from "express";
import scrape from "../utils/userDataScraper";
import AuthProducer from "../kafka";

/**
 * `AuthController` class for all auth related business logic.
 */
export default class AuthController {
	private static producer: AuthProducer = new AuthProducer({
		brokers: process.env.KAFKA_BROKERS?.split(" ") || [ "localhost:9092" ],
		clientId: process.env.KAFKA_CLIENT || "leetcode-roulette"
	});

	/**
	 * Syncs a users session and updates client cookies.
	 * @param req - Express Request object
	 * @param res - Express Response object
	 */
	public static async sync(req: Request, res: Response): Promise<void> {
		const { sessionCookie } = req.body;

		try {
			const user = await scrape(sessionCookie);
			if (user.userId === null) throw new Error("Invalid session cookie");

			const value = JSON.stringify({
				sessionCookie,
				...user
			});

			req.session.user = {
				userId: user.userId,
				username: user.username
			};

			await AuthController.producer.produce([{
				value
			}]);

			res.status(200).send("User successfully synced.");
		} catch(e) {
			res.status(500).json({
				message: "Failed to sync user",
				errors: e
			});
		}
	}

	/**
	 * Logs a user out of their session and removes id from session
	 * @param req - Express Request object
	 * @param res - Express Response object
	 */
	public static logout(req: Request, res: Response) {
		if (!req.session.user) {
			res.status(200).send("No user session found");
			return;
		}

		req.session.destroy(e => {
			if (e) {
				return res.status(400).send("Error deleting session: " + e);
			} else {
				return res.status(200).send("Successfully logged out user");
			}
		});
	}
}
