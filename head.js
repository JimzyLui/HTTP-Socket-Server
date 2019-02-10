// "use strict";

const date = new Date();
const objHead = {
  //content-type:'text/html',
};
const strHead = `HTTP/1.1 200\nContent-Type:text/html\nDate:${date}\ntitle:Test`;

module.exports = { head: strHead };
