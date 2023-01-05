import { Consumer, Kafka, KafkaConfig } from "kafkajs";
import { logger } from "../logger";
import scrape from "../packages/userQuestionDataScraper";
import UserQuestionDataProducer from "./producer";

class UserQuestionDataConsumer {
	private readonly kafka: Kafka;
	private readonly consumer?: Consumer;
	private readonly userQuestionDataProducer: UserQuestionDataProducer;

	constructor(kafkaConfig: KafkaConfig) {
		this.kafka = new Kafka(kafkaConfig);
		this.userQuestionDataProducer = new UserQuestionDataProducer(kafkaConfig); 
	}

	public async consume(): Promise<void> {
		const consumer: Consumer = this.kafka.consumer({ groupId: "01" });
		await consumer.connect();
		await consumer.subscribe({
			topics: [ "roulette.auth.signin" ],
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

					await this.userQuestionDataProducer.produce(data.questions.map(question => ({
						value: JSON.stringify({
							...data.user,
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

export default UserQuestionDataConsumer;
