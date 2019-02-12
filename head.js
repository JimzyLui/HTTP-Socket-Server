"use strict";

const date = new Date();
const objHead = {
  //content-type:'text/html',
};
const strHeadStatus200 = `HTTP/1.1 200\nContent-Type:text/html\nLast-Modified:${date}\ntitle:Test`;
const strHeadStatus304 = `HTTP/1.1 304\nContent-Type:text/html\nDate:${date}`;

module.exports = {
  status200: strHeadStatus200,
  status304: strHeadStatus304
};
