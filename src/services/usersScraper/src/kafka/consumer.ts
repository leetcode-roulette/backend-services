import { Consumer, Kafka, KafkaConfig } from "kafkajs";
import { logger } from "../logger";
import scrape from "../packages/usersScraper";
import UsersScraperProducer from "./producer";

class UsersScraperConsumer {
	private readonly kafka: Kafka;
	private readonly consumer?: Consumer;
	private readonly usersScraperProducer: UsersScraperProducer;

	constructor(kafkaConfig: KafkaConfig) {
		this.kafka = new Kafka(kafkaConfig);
		this.usersScraperProducer = new UsersScraperProducer(kafkaConfig); 
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
					const data = await scrape(session);
					await this.usersScraperProducer.produce([{
						value: JSON.stringify(data)
					}]);
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

export default UsersScraperConsumer;
