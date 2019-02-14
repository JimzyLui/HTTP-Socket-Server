const headData = require("./head.js");

var net = require("net");
// var ipRaymond = "192.168.200.177";
const hostname = "localhost";
const port = "8080";
var client = new net.Socket();
client.connect(port, hostname, function() {
  console.log("Connected");

  // const strLong = "This is a test.";
  const arrArgs = process.argv;
  const arrOptions = process.execArgv;
  const objUserEnvironment = process.env;
  const objHead = { host: "", referrer: "" };
  let url = "";
  // console.log("Hi " + objUserEnvironment.USER);
  // client.write(arrArgs[2]);
  // console.log("args: ", arrArgs[2]);
  arrArgs.shift();
  arrArgs.shift();
  // const strMsg = "# of arguments: " + arrArgs.length.toString();
  // console.log(strMsg); //writing at client side
  // client.write(strMsg); //writing at server side
  if (arrArgs.length === 0) {
    const strUsage = "Usage: URL/page";
    console.log(strUsage);
  } else {
    // make a header to send to the server
    url = arrArgs[0];
    objHead.referrer = url;
    arrUrlParts = url.split("/");
    console.log("arrUrlParts: ", arrUrlParts);
    objHead.host = arrUrlParts[0];
    objHead.page = "/" + arrUrlParts[1];
    const head = headData.getHead(objHead);
    client.write(head);
  }
  // get input from console/user
  // process.stdin.pipe(client);
  // process.stdin.pipe(process.stdout);  // echo's back
  // client.on("data", function(data) {
  //   console.log("received inside connection: " + data);
  // });
  client.end();
  // process.abort();
  // process.exit();
});

client.on("data", function(data) {
  console.log("Received: " + data);
});

client.on("close", function() {
  console.log("Connection closed");
});

process.on("exit", code => {
  console.log(`About to exit with code: ${code}`);
});
