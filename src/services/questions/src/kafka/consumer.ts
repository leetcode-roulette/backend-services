import { Questions } from "../models/questions";
import { UserQuestionStatuses } from "../models/userQuestionStatuses";
import { QuestionTags } from "../models/questionTags";
import { Consumer, Kafka, KafkaConfig } from "kafkajs";

class QuestionsConsumer {
	private readonly kafka: Kafka;
	private readonly consumers: Array<Consumer> = [];

	constructor(kafkaConfig: KafkaConfig) {
		this.kafka = new Kafka(kafkaConfig);
	}

	public async consume(): Promise<void> {
		await this.consumeQuestions();
		await this.consumeUserQuestionStatuses();
	}

	private async consumeQuestions(): Promise<void> {
		const consumer: Consumer = await this.kafka.consumer({ groupId: "questions" });
		await consumer.connect();
		await consumer.subscribe({
			topics: [ "questions" ],
			fromBeginning: true
		});

		await consumer.run({
			eachMessage: async({ topic, message }) => {
				if (!message.value) {
					return;
				}

				const question = JSON.parse(message.value.toString());
				await Questions.findOneAndUpdate({ _id: question._id }, question, { upsert: true, new: true });

				console.log({
					topic: topic.toString(),
					message: JSON.parse(message.value.toString())
				});
			}
		});

		this.consumers.push(consumer);
	}

	private async consumeQuestionTags(): Promise<void> {
		const consumer: Consumer = await this.kafka.consumer({ groupId: "questionTags" });
		await consumer.connect();
		await consumer.subscribe({
			topics: [ "questionTags" ],
			fromBeginning: true
		});

		await consumer.run({
			eachMessage: async({ topic, message }) => {
				if (!message.value) {
					return;
				}

				const { questionId, tagSlug } = JSON.parse(message.value.toString());
				await QuestionTags.findOneAndUpdate({ questionId, tagSlug }, {
					questionId,
					tagSlug
				}, { upsert: true, new: true });

				console.log({
					topic: topic.toString(),
					message: JSON.parse(message.value.toString())
				});
			}
		});

		this.consumers.push(consumer);
	}

	private async consumeUserQuestionStatuses(): Promise<void> {
		const consumer: Consumer = await this.kafka.consumer({ groupId: "userQuestionStatuses" });
		await consumer.connect();
		await consumer.subscribe({
			topics: [ "userQuestionStatuses" ],
			fromBeginning: true
		});

		await consumer.run({
			eachMessage: async({ topic, message }) => {
				if (!message.value) {
					return;
				}

				const { userId, questionTitle } = JSON.parse(message.value.toString());
				await UserQuestionStatuses.findOneAndUpdate({ userId, questionTitle }, {
					userId,
					questionTitle
				}, { upsert: true, new: true });

				console.log({
					topic: topic.toString(),
					message: JSON.parse(message.value.toString())
				});
			}
		});

		this.consumers.push(consumer);
	}

	public async close(): Promise<void> {
		for (let i = 0; i < this.consumers.length; i++) {
			await this.consumers[i].disconnect();
		}
	}
}

export default QuestionsConsumer;
