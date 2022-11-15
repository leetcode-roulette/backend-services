import { app } from "./app";
import { logger } from "./logger";
import mongoose from "mongoose";

const serve = async () => {
	const PORT = process.env.PORT || 3000;
	const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/tagsService";

	try {
		await mongoose.connect(MONGO_CONNECTION_STRING);
		console.log("Connected to database");
	} catch(e) {
		logger.error("Exception caught while trying to connect to database: " + e);
	}

	app.listen(PORT, () => {
		logger.info(`Server is listening on port ${PORT}`);
	});
};

serve();
