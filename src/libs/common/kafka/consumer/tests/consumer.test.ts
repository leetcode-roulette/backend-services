import Consumer from "../src";

describe("Tests for Roulette kafka consumer library.", () => {
	test("Can add consumers to Consumer object.", () => {
		const consumer: Consumer = new Consumer({
			brokers: ["http://localhost:9092"]
		});

		consumer.add({
			topic: "roulette.test.consumers"
		}, {
			groupId: "01"
		});

		consumer.add({
			topic: "roulette.another.consumer"
		}, {
			groupId: "02"
		});

		expect(consumer.consumers).toHaveLength(2);
	});
});
