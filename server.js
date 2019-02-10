const net = require("net");
const errorDoc = require("./htmlFiles/404.js");
const indexDoc = require("./htmlFiles/index.js");
const heliumDoc = require("./htmlFiles/helium.js");
const hydrogenDoc = require("./htmlFiles/hydrogen.js");
const stylesDoc = require("./htmlFiles/styles.js");
const headData = require("./head.js");
const hostname = "localhost";
const port = "8080";
// const rteAdmin = require("./admin.js");

//const arrClientConnections = [];

const server = net.createServer(socket => {
  console.log("client connected.");
  socket.on("data", data => {
    console.log("data here.");

    // console.log(data);
    // socket.write(data);
    let parsedData = data.toString();
    parsedData = parsedData.split("\n");

    // console.log(parsedData);

    const requestLine = parsedData[0].split(" ");
    const method = requestLine[0];
    const requestUri = requestLine[1];
    console.log("method", method);
    // console.log("requestUri", requestUri);
    // console.log(Date() + ` ${method} ` + ` ${requestUri} `);
    // socket.end();

    const callRoute = (socket, htmlDoc, bCss) => {
      // const serverResponse = `${headData.head}\n\n${htmlDoc}`;
      let serverResponse = headData.head + "\n\n" + htmlDoc;
      if (bCss) {
        serverResponse = serverResponse.replace("text/html", "text/css");
        console.log("css applied");
      }
      // console.log(htmlDoc);
      socket.write(serverResponse);
      socket.end();
    };

    if (method === "GET") {
      console.log("requestUri: ", requestUri);

      switch (requestUri) {
        case "/":
          callRoute(socket, indexDoc);
          break;
        case "/css/styles.css":
          callRoute(socket, stylesDoc, true);
          break;
        case "/helium.html":
          callRoute(socket, heliumDoc);
          break;
        case "/hydrogen.html":
          callRoute(socket, hydrogenDoc);
          break;
        default:
          callRoute(socket, errorDoc);
          // callRoute(socket, indexDoc);
          break;
      }
      socket.end();
    }
  });

  socket.on("end", () => {
    console.log("client disconnected");
  });

  // const body =
  //   "<body><h1>Testing Server Response</h1>The rain in Spain falls mainly on the plain.<br></body>";
  // const serverResponse = `${headData.head}\n\n${body}`;

  // socket.write(serverResponse);
  // socket.pipe(socket);
  // socket.end("\n\nconnection ended.\n");
});
server.on("error", err => {
  // handle errors
  throw err;
});

// grab a the port
server.listen(port, () => {
  // console.log("connected to server at ", server.address());
  console.log(`Server listening at http://${hostname}:${port}`);
});
