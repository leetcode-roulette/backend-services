import Users from "../models/users";
import UserQuestionData from "../models/userQuestionData";
import { Consumer, Kafka, KafkaConfig } from "kafkajs";

class UsersConsumer {
	private readonly kafka: Kafka;
	private readonly consumers: Array<Consumer> = [];

	constructor(kafkaConfig: KafkaConfig) {
		this.kafka = new Kafka(kafkaConfig);
	}

	public async consume(): Promise<void> {
		await this.consumeUsers();
		await this.consumeUserQuestionData();
	}

	private async consumeUsers(): Promise<void> {
		const consumer: Consumer = await this.kafka.consumer({ groupId: "users" });
		await consumer.connect();
		await consumer.subscribe({
			topics: [ "users" ],
			fromBeginning: true
		});

		await consumer.run({
			eachMessage: async({ topic, message }) => {
				if (!message.value) {
					return;
				}

				const { id, username, avatar, isPremium } = JSON.parse(message.value.toString());
				await Users.findOneAndUpdate({ username }, {
					_id: id,
					username,
					avatar,
					isPremium
				}, { upsert: true, new: true });

				console.log({
					topic: topic.toString(),
					message: JSON.parse(message.value.toString())
				});
			}
		});

		this.consumers.push(consumer);
	}

	private async consumeUserQuestionData(): Promise<void> {
		const consumer: Consumer = await this.kafka.consumer({ groupId: "userQuestionData" });
		await consumer.connect();
		await consumer.subscribe({
			topics: [ "userQuestionData" ],
			fromBeginning: true
		});

		await consumer.run({
			eachMessage: async({ topic, message }) => {
				if (!message.value) {
					return;
				}

				const { username, questionTitle, questionDifficulty, isCompleted, hasBeenAttempted } = JSON.parse(message.value.toString());
				await UserQuestionData.findOneAndUpdate({ username, questionTitle }, {
					username,
					questionTitle,
					questionDifficulty,
					isCompleted,
					hasBeenAttempted
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

export default UsersConsumer;
