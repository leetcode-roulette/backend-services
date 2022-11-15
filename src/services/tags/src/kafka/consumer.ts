import { Tags } from "../models/tags";
import { Consumer, Kafka, KafkaConfig } from "kafkajs";
import { logger } from "../logger";

class TagsConsumer {
	private readonly kafka: Kafka;
	private readonly consumer?: Consumer;

	constructor(kafkaConfig: KafkaConfig) {
		this.kafka = new Kafka(kafkaConfig);
	}

	public async consume(): Promise<void> {
		const consumer: Consumer = this.kafka.consumer({ groupId: "roulette-group" });
		await consumer.connect();
		await consumer.subscribe({
			topics: [ "tags" ],
			fromBeginning: true
		});
		await consumer.run({
			eachMessage: async ({ topic, message }) => {
				if (!message.value) {
					return;
				}

				const { slug, name, numberOfProblems } = JSON.parse(message.value.toString());
				await Tags.findOneAndUpdate({ slug }, {
					slug,
					name,
					numberOfProblems
				}, { new: true, upsert: true }).catch(e => logger.error(e));

				console.log({
					topic: topic.toString(),
					message: JSON.parse(message.value.toString())
				});
			}
		});
	}

	public async close(): Promise<void> {
		await this.consumer?.disconnect();
	}
}

export default TagsConsumer;
