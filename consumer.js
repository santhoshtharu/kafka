// consumer.js
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092'],
});
const consumer = kafka.consumer({ groupId: 'test-group' });
const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};
consumeMessages().catch(err => {
  console.error('Error in consumer', err);
  consumer.disconnect();
});
