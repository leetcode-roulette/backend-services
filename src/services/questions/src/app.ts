import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/questions";
import { config } from "dotenv";

config();

export const app: Application = ((): Application => {
	const app: Application = express();
	app.use(express.json());
	app.use(cors());
	app.use(cookieParser());
	app.set("json spaces", 2);
	app.use("/", router);

	return app;
})();
