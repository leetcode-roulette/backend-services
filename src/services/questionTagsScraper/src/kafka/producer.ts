import { Kafka, KafkaConfig, Message, Partitioners, Producer } from "kafkajs";

class QuestionTagProducer {
	private readonly kafka: Kafka;
	private readonly producer: Producer;

	constructor(kafkaConfig: KafkaConfig) {
		this.kafka = new Kafka(kafkaConfig);
		this.producer = this.kafka.producer({
			createPartitioner: Partitioners.DefaultPartitioner
		});
	}

	public async produce(messages: Array<Message>): Promise<void> {
		await this.producer.connect();
		await this.producer.send({
			topic: "questionTags",
			messages
		});
	}

	public async close(): Promise<void> {
		await this.producer?.disconnect();
	}
}

export default QuestionTagProducer;
