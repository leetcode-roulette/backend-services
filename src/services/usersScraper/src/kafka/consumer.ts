import { Consumer, Kafka, KafkaConfig } from "kafkajs";
import { logger } from "../logger";
import scrapeUserData from "../packages/usersScraper";
import scrapeUserQuestionData from "../packages/userQuestionDataScraper/packages/userQuestionDataScraper";
import ScraperProducer from "./producer";

class UserScraperConsumer {
	private readonly kafka: Kafka;
	private readonly consumer?: Consumer;
	private readonly usersProducer: ScraperProducer;
	private readonly userQuestionDataProducer: ScraperProducer;

	constructor(kafkaConfig: KafkaConfig) {
		this.kafka = new Kafka(kafkaConfig);
		this.usersProducer = new ScraperProducer(kafkaConfig, "users");
		this.userQuestionDataProducer = new ScraperProducer(kafkaConfig, "userQuestionData");
	}

	public async consume(): Promise<void> {
		const consumer: Consumer = this.kafka.consumer({ groupId: "users-scraper" });
		await consumer.connect();
		await consumer.subscribe({
			topics: [ "signin" ],
			fromBeginning: true
		});
		await consumer.run({
			eachMessage: async ({ topic, message }) => {

				if (!message.value) {
					return;
				}

				const { username, session } = JSON.parse(message.value.toString());
				try {
					const userData = await scrapeUserData(session);
					const userQuestionData = await scrapeUserQuestionData(session);
					await this.usersProducer.produce([{
						value: JSON.stringify(userData)
					}]);
					await this.userQuestionDataProducer.produce(userQuestionData.questions.map(question => ({
						value: JSON.stringify({
							...userData,
							...question
						})
					})));
				} catch(e) {
					logger.error("Error scraping or sending data: " + e);
				}

				console.log({
					topic: topic.toString(),
					message: `${username} has signed in`
				});
			}
		});
	}

	public async close(): Promise<void> {
		await this.consumer?.disconnect();
	}
}

export default UserScraperConsumer;
