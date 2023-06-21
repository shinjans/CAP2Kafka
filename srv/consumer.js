// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs");
const fs = require('fs');

// the client ID lets kafka know who's producing the messages
const clientId = "testKafka1-ss";
// we can define the list of brokers in the cluster
const brokers = ["pkc-gxvxn.eastus2.azure.confluent.cloud:9092"];
// this is the topic to which we want to write messages
const topic = "event-sap-hana-test";

const requestTimeout = 45000;
//authentication
const sasl = {
  mechanism: "plain", // scram-sha-256 or scram-sha-512
  username: "7U2FGXUKPMZXP4I3",
  password: "hjPvSJBJfLg5bl43SBrAqdsSp5OvZmoRUihYyDaaGbCugmA42uloYldsNx1P22qg",
};

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({
  clientId: clientId,
  brokers: brokers,
  requestTimeout: requestTimeout,
  // authenticationTimeout: 10000,
  // reauthenticationThreshold: 10000,
  ssl: true,
  sasl: sasl,
});

data = [
  {
    key: "testkey1",
    value: JSON.stringify({
      my_field1: 1,
      my_field2: 1.11,
      my_field3: "record1",
    }),
  },
  {
    key: "testkey2",
    value: JSON.stringify({
      my_field1: 2,
      my_field2: 2.22,
      my_field3: "record2",
    }),
  },
  {
    key: "testkey3",
    value: JSON.stringify({
      my_field1: 3,
      my_field2: 3.33,
      my_field3: "record3",
    }),
  },
  {
    key: "testkey4",
    value: JSON.stringify({
      my_field1: 4,
      my_field2: 4.44,
      my_field3: "record4",
    }),
  },
  {
    key: "testkey5",
    value: JSON.stringify({
      my_field1: 5,
      my_field2: 5.55,
      my_field3: "record5",
    }),
  },
];



// let rawdata = fs.readFileSync('../db/data/orders.json');
// let orders = JSON.parse(rawdata);

// var kafkaData = [];
// orders.value.forEach((order) => {
//     kafkaData.push({
//         key: order.SALES_ORDER,
//         value: JSON.stringify(order)
//     })
// });

// const producer = kafka.producer();
const consumer = kafka.consumer({groupId: "testKafka1-ss"});

// we define an async function that writes a new message each second
const run = async () => {
//   await producer.connect();
//   await producer.send({
//     topic,
//     messages: kafkaData,
//   });
// consume

await consumer.connect()
await consumer.subscribe({ topic: "event-sap-hana-test", fromBeginning: true })

await consumer.run({
  eachMessage: async ({ topic, partition, message })=> {
    console.log({
      partition,
      offset: message.offset,
      value: message.value.toString(),
    })
  },
})

  // let i = 0;

  // // after the produce has connected, we start an interval timer
  // setInterval(async () => {
  //   try {
  //     // send a message to the configured topic with
  //     // the key and value formed from the current value of `i`
  //     await producer.send({
  //       topic,
  //       messages: data
  //     });

  //     // if the message is written successfully, log it and increment `i`
  //     console.log("writes: ", i);
  //     i++;
  //   } catch (err) {
  //     console.error("could not write message " + err);
  //   }
  // }, 1000);
};

// module.exports = run;
run().catch(console.error)

consumer.disconnect()
// producer.disconnect()