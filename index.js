const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const axios = require("axios");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Make a request for a user with a given ID
axios
  .get("https://glucose.ryan.dellol.io/api/v1/entries/current.json")
  .then(function (response) {
    // handle success
    console.log(response.data[0].sgv);

    io.on("connection", (socket) => {
      console.log("a user connected");

      io.emit("sgv", response.data[0].sgv);

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
server.listen(3000, () => {
  console.log("listening on *:3000");
});
