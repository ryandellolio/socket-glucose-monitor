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
poll(
  () =>
    new Promise(() => {
      // Make a request for a user with a given ID
      axios
        .get("https://glucose.ryan.dellol.io/api/v1/entries/current.json")
        .then(function (response) {
          // handle success
          console.log(response.data[0].sgv + ' at ' + response.data[0].dateString);
          io.emit("sgv", response.data[0].sgv);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }),
  2000
);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
