const net = require("net");
// var ipRaymond = "192.168.200.177";
const hostname = "localhost";
const port = "8080";
const client = new net.Socket();
client.connect(port, hostname, function() {
  console.log("Connected");

  //client.write(strLong);
  process.stdin.pipe(client);
  // client.close();
});

client.on("data", function(data) {
  console.log("Received: " + data);
  let parsedData = data.toString();
  parsedData = parsedData.split("\n");
  console.log("parsedData", parsedData);
  const requestLine = parsedData[0].split(" ");
  const method = requestLine[0];
  const requestUri = requestLine[1];
  console.log("method: ", method);
  console.log("requestUri: ", requestUri);
});

client.on("close", function() {
  console.log("Connection closed");
});
