import express, { Router, Request, Response, Handler } from "express";

const healthcheck : Handler = (req: Request, res: Response) => {
	const VERSION : string = process.env.VERSION || "1.0.0";
	const ENVIRONMENT : string = process.env.ENVIRONMENT || "dev";

	res.status(200).json({
		version: VERSION,
		environment: ENVIRONMENT,
		status: "Live"
	});
};

const healthcheckRouter : Router = express.Router();
healthcheckRouter.route("/healthcheck").get(healthcheck);

export default healthcheckRouter;
