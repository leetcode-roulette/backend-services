import Users, { iUser } from "../models/users";
import { NextFunction, Request, Response } from "express";

const isAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const user: iUser | null = await Users.findById( req.session?.userId );
		if (!user) {
			throw new Error("Unauthorized!");
		}

		req.user = {
			id: user._id,
			username: user.username,
			isPremium: user.isPremium,
			avatar: user.avatar
		};

		return next();
	} catch(e) {
		res.status(401).json({
			message: "Failed to retrieve currently authorized user",
			errors: e
		});
		return next(e);
	}
};

export default isAuthorized;
