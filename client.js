var net = require("net");
// var ipRaymond = "192.168.200.177";
const hostname = "localhost";
const port = "8080";
const client = new net.Socket();
client.connect(port, hostname, function() {
  console.log("Connected");

  //client.write(strLong);
  process.stdin.pipe(client);
});

client.on("data", function(data) {
  console.log("Received: " + data);
});

client.on("close", function() {
  console.log("Connection closed");
});
