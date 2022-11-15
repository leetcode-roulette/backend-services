import { app } from "./app";
import { logger } from "./logger";
import mongoose from "mongoose";
import UsersConsumer from "./kafka";

const serve = async () => {
	const PORT = process.env.PORT || 3000;
	const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/usersService";
	const KAFKA_BROKERS = process.env.KAFKA_BROKERS?.split(" ") || ["kafka1:9092", "kafka2:9092"];
	const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || "leetcode-roulette";

	const consumer: UsersConsumer = new UsersConsumer({
		clientId: KAFKA_CLIENT_ID,
		brokers: KAFKA_BROKERS
	});

	mongoose.connect(MONGO_CONNECTION_STRING).catch(e => logger.error("Error connecting to database: " + e));
	consumer.consume().catch(e => logger.error("Error connecting to kafka: " + e));

	app.listen(PORT, () => {
		logger.info(`Server is listening on port ${PORT}`);
	});
};

serve();
