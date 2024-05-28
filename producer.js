// producer.js
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092'],
});
const producer = kafka.producer();
const produceMessage = async () => {
  await producer.connect();
  try {
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    });
    console.log('Message sent successfully');
  } catch (err) {
    console.error('Error sending message', err);
  } finally {
    await producer.disconnect();
  }
};
produceMessage();
