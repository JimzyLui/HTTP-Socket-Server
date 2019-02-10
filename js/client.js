var net = require("net");
var ipRaymond = "192.168.200.177";
var client = new net.Socket();
client.connect(8181, "127.0.0.1", function() {
  console.log("Connected");
  client.write("Hello, server! Love, Client.");
  process.stdin.pipe(client);
});

client.on("data", function(data) {
  console.log("Received: " + data);
});

client.on("close", function() {
  console.log("Connection closed");
});
