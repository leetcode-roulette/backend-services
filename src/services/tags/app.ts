import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
import { config } from "dotenv";

config();

export const app: Application = ((): Application => {
	const app: Application = express();
	app.use(express.json());
	app.use(cors());
	app.set("json spaces", 2);
	app.use("/", router);

	return app;
})();
