import { KafkaConfig, ConsumerConfig, ConsumerRunConfig, Consumer, Kafka, ConsumerSubscribeTopics, ConsumerSubscribeTopic } from "kafkajs";

/**
 * Creates new Kafka Consumers.
 */
export default class RouletteConsumer {

  /**
   * Kafka instance
   */
  private readonly kafka: Kafka;

  /**
   * Array of created consumers.
   */
  public readonly consumers: Array<Consumer> = [];
  
  /**
   * Creates new Kafka instance.
   * @param kafkaConfig - Kafkaconfig to use for new Kafka instance.
   */
  constructor(kafkaConfig: KafkaConfig) {
    this.kafka = new Kafka(kafkaConfig);
  }

  /**
   * Creates and runs a new consumer and adds it to the array of consumers.
   * @param subscription - Subscription information for the consumer instance.
   * @param consumerConfig - Config for creating consumer.
   * @param consumerRunConfig -  Run configuration for new consumer.
   */
  public async add(subscription: ConsumerSubscribeTopics | ConsumerSubscribeTopic, consumerConfig: ConsumerConfig, consumerRunConfig?: ConsumerRunConfig): Promise<void> {
    const consumer: Consumer = this.kafka.consumer(consumerConfig);

    await consumer.connect();
    await consumer.subscribe(subscription);
    await consumer.run(consumerRunConfig);

    this.consumers.push(consumer);
  }

  /**
   * Disconnects all created consumers.
   */
  public async disconnect(): Promise<void> {
    for (let i = 0; i < this.consumers.length; i++) {
      await this.consumers[i].disconnect();
    }
  }
}
