const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "kafkaex",
    brokers: ['host.docker.internal:9092']
})

const admin = kafka.admin()

async function run() {
    await admin.connect()
    return admin.listTopics()
}

run().then((data) => {
    console.log(data)
})