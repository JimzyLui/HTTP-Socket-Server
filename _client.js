const net = require("net");
// var ipRaymond = "192.168.200.177";
const hostname = "localhost";
const port = "8080";


const client2 = net.createServer(socket2 => {
  console.log("client connected.");
  socket2.on("data", data => {
    let parsedData = data.toString();
    socket2.write(parsedData);
  });

const client = net.createConnection({ port: 8080 }, () => {
  // 'connect' listener
  console.log("connected to server!");
  //client.write("world!\r\n");
});
client.on("data", data => {
  console.log(data.toString());
  client.end();
});
client.on("end", () => {
  console.log("disconnected from server");
});

/*
const client = new net.Socket();
client.connect(port, hostname, function() {
  console.log("Connected");
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
    client.end();
  });
  client.write("we are connected.");
  // process.stdin.pipe(client);
  client.end();
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
  client.end();
});

client.on("close", function() {
  console.log("Connection closed");
});
*/
