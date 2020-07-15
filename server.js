var Kafka = require("node-rdkafka");

var producer = new Kafka.Producer({
  "metadata.broker.list": "localhost:9092",
  dr_cb: true,
});

var topicName = "test";

producer.on("event.log", function (log) {
  console.log(log);
});

producer.on("event.error", function (err) {
  console.error("Error from producer");
  console.error(err);
});

producer.on("delivery-report", function (err, report) {
  console.log("delivery-report: " + JSON.stringify(report));
});

producer.on("ready", function async(arg) {
  console.log("producer ready." + JSON.stringify(arg));
  var headers = [{ header: "header value" }];
  setInterval(() => {
    producer.produce(
      topicName,
      -1,
      Buffer.from("Hello World!"),
      "ii",
      Date.now(),
      "",
      headers
    );
  }, 2000);
});

producer.on("disconnected", function (arg) {
  console.log("producer disconnected" + JSON.stringify(arg));
});

producer.connect(null, () => {
  console.log("producer connected");
});
