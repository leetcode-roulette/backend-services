import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
import { config } from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import {} from "./types/express-session";

config();

export const app: Application = ((): Application => {
	const app: Application = express();
	app.use(session({secret: process.env.SECRET_KEY || "Secret", resave: true, saveUninitialized: true }));
	app.use(cookieParser());
	app.use(express.json());
	app.use(cors());
	app.set("json spaces", 2);
	app.use("/", router);

	return app;
})();
