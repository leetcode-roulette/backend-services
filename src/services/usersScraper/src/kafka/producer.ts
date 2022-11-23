import { Kafka, KafkaConfig, Message, Partitioners, Producer } from "kafkajs";

class ScraperProducer {
	private readonly kafka: Kafka;
	private readonly producer: Producer;
	private readonly topic: string;

	constructor(kafkaConfig: KafkaConfig, topic: string) {
		this.kafka = new Kafka(kafkaConfig);
		this.producer = this.kafka.producer({
			createPartitioner: Partitioners.DefaultPartitioner
		});
		this.topic = topic;
	}

	public async produce(messages: Array<Message>): Promise<void> {
		await this.producer.connect();
		await this.producer.send({
			topic: this.topic,
			messages
		});
	}

	public async close(): Promise<void> {
		await this.producer?.disconnect();
	}
}

export default ScraperProducer;
