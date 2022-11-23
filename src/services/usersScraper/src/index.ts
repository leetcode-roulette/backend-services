import { UserScraperConsumer } from "./kafka";
import { app } from "./app";
import { logger } from "./logger";

const serve = async () : Promise<void> => {
	const PORT: string | number = process.env.PORT || 3000;
	const KAFKA_BROKERS = process.env.KAFKA_BROKERS?.split(" ") || ["kafka1:9092", "kafka2:9092"];
	const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || "leetcode-roulette";

	const consumer: UserScraperConsumer = new UserScraperConsumer({
		brokers: KAFKA_BROKERS,
		clientId: KAFKA_CLIENT_ID
	});

	consumer.consume().catch(e => logger.error("Error running event consumer: " + e));

	app.listen(PORT, () => {
		logger.info(`Server is listening on port ${PORT}`);
	});
};

serve();
