const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const axios = require("axios");
const port = process.env.PORT || 3000;

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

          if (global.dateString !== response.data[0].dateString) {
            console.log("New reading detected");
            io.emit("sgv", response.data[0].sgv);
            io.emit("reading", response.data[0]);
          }
          global.dateString = response.data[0].dateString;
          global.lastReading = response.data[0];

          console.log(
            response.data[0].sgv + " at " + response.data[0].dateString
          );
        })

        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }),
  8000
);

io.on("connection", (socket) => {
  console.log("User " + socket.id + " connected");

  //first time emit the last reading
  io.to(socket.id).emit("sgv", global.lastReading.sgv);
  io.to(socket.id).emit("reading", global.lastReading);

  socket.on("disconnect", () => {
    console.log("User " + socket.id + " disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(port, () => {
  console.log("listening " + port);
});
