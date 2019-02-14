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
    let parsedData = data.toString();
    console.log("parsedData: ", parsedData);
    let arrParsedData = parsedData.split("\n");
    // console.log("arrParsedData: ", arrParsedData);
    const arrRequestLine = arrParsedData[0].split(" ");
    const method = arrRequestLine[0];
    const requestUri = arrRequestLine[1];

    let strModifiedSince = arrParsedData
      .filter(x => x.indexOf("If-Modified-Since:") > -1)
      .toString();
    // console.log("typeof", typeof strModifiedSince);
    if (strModifiedSince) {
      strModifiedSince = strModifiedSince
        .replace("If-Modified-Since:", "")
        .trim();
      console.log("Modified-since: ", strModifiedSince);
    }

    // console.log("method", method);
    // console.log("requestUri", requestUri);
    // console.log(Date() + ` ${method} ` + ` ${requestUri} `);
    // socket.end();

    /******************************
     * CALLROUTE *
     ******************************/
    const callRoute = (socket, htmlDoc, bCss) => {
      console.log("callRoute");
      let strLastModified = headData.status200
        .split("\n")
        .filter(x => x.indexOf("Last-Modified:") > -1)
        .toString();
      if (strLastModified) {
        strLastModified = strLastModified.replace("Last-Modified:", "").trim();
      }
      let serverResponse = "";
      const dteLastModified = Date.parse(strLastModified);
      const dteModifiedSince = Date.parse(strModifiedSince);
      if (dteLastModified <= dteModifiedSince) {
        serverResponse = `${headData.status304}\n\n`;
        // file date hasn't changed, throw error
        console.log("no updates.");
      } else {
        console.log("refreshing....");
        serverResponse = `${headData.status200}\n\n${htmlDoc}`;
        console.log("serverResponse made.");
      }
      // serverResponse = `${headData.status200}\n\n${htmlDoc}`;

      if (bCss) {
        // adjust for css file
        serverResponse = serverResponse.replace("text/html", "text/css");
        console.log("css applied");
      }
      // console.log("serverResponse: ", serverResponse);
      console.log("about to write serverResponse");
      socket.write(serverResponse);
      console.log("after serverResponse");
      socket.end();
      console.log("after socket end");
    };
    // console.log();
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
          break;
      }
      socket.end();
    }
  });

  socket.on("end", () => {
    console.log("client disconnected");
  });
});
/*
server.on("error", err => {
  // handle errors
  console.log("err: ", err.message);
  throw err;
});
*/

// grab a the port
server.listen(port, () => {
  // console.log("connected to server at ", server.address());
  console.log(`Server listening at http://${hostname}:${port}`);
});
