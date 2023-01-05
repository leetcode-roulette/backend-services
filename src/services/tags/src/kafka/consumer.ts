import { Tags } from "../models/tags";
import { Consumer, Kafka, KafkaConfig } from "kafkajs";
import { logger } from "../logger";
import { QuestionTags } from "@models/questionTags";

class TagsConsumer {
	private readonly kafka: Kafka;
	private readonly consumer?: Consumer;

	constructor(kafkaConfig: KafkaConfig) {
		this.kafka = new Kafka(kafkaConfig);
	}

	public async consume(): Promise<void> {
		await this.consumeTags();
		await this.consumeQuestionTags();
	}

	private async consumeTags(): Promise<void> {
		const consumer: Consumer = this.kafka.consumer({ groupId: "tags" });
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

				const { slug, name } = JSON.parse(message.value.toString());
				await Tags.findOneAndUpdate({ slug }, {
					slug,
					name
				}, { new: true, upsert: true }).catch(e => logger.error(e));

				console.log({
					topic: topic.toString(),
					message: JSON.parse(message.value.toString())
				});
			}
		});
	}

	private async consumeQuestionTags(): Promise<void> {
		const consumer: Consumer = this.kafka.consumer({ groupId: "questionTags" });
		await consumer.connect();
		await consumer.subscribe({
			topics: [ "questionTags" ],
			fromBeginning: true
		});
		await consumer.run({
			eachMessage: async ({ topic, message }) => {
				if (!message.value) {
					return;
				}

				const { slug, questionId } = JSON.parse(message.value.toString());
				await QuestionTags.findOneAndUpdate({ slug, questionId }, {
					slug,
					questionId
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
