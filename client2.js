var Kafka = require("node-rdkafka");
var consumer = new Kafka.KafkaConsumer({
  "group.id": "2",
  "metadata.broker.list": "localhost:9092",
});

consumer.connect(null, () => {
  console.log("connected");
});

consumer
  .on("ready", function () {
    consumer.subscribe(["test"]);
    consumer.consume();
  })
  .on("data", function (data) {
    console.log(data.value.toString());
  });
