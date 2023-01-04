import { app } from "./app";
import { logger } from "./logger";
import TagsProducer from "./kafka";
import { scrape } from "./packages/tagsScraper";
import { Cronjob } from "./packages/cronjob";

const serve = async () : Promise<void> => {
	const PORT: string | number = process.env.PORT || 3000;
	const KAFKA_BROKERS = process.env.KAFKA_BROKERS?.split(" ") || ["kafka1:9092", "kafka2:9092"];
	const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || "leetcode-roulette";
	const CRON_EXPRESSION = process.env.CRON_EXPRESSION || "0 0 * * * *";

	const producer: TagsProducer = new TagsProducer({
		clientId: KAFKA_CLIENT_ID,
		brokers: KAFKA_BROKERS
	});

	new Cronjob(CRON_EXPRESSION, async () => {
		const data = await scrape();
		producer.produce(data.map(tag => ({
			value: JSON.stringify(tag)
		}))).catch(e => logger.error(e));
	});

	app.listen(PORT, () => {
		logger.info(`Server is listening on port ${PORT}`);
	});
};

serve();
