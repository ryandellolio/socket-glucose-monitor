const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const axios = require("axios");

var sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
var poll = (promiseFn, time) =>
  promiseFn().then(sleep(time).then(() => poll(promiseFn, time)));

// Greet the World every second
var svg = 0;
poll(
  () =>
    new Promise(() => {
      console.log("Hello World!");
    }),
  1000
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
