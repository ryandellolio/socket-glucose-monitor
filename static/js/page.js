$(document).ready(function () {
    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
      myChart.destroy();
    });

    socket.on("retro", function (history) {
      i = history.length - 1;
      while (i > 0) {
        //drop the last reading by stopping at 1.  There will be emit of most recent reading outside of retro emission
        myChart.data.labels.push(
          moment(history[i].dateString).format("hh:mm a")
        );
        myChart.data.datasets[0].data.push(history[i].sgv);
        i = i - 1;
      }
      console.log(history);
    });

    socket.on("reading", function (msg) {
      $("#main").html("Reading: " + msg.sgv + " mg/dL");
      $(document).prop("title", generateTitle(msg));
      $("#next").html(
        "Next reading: " + moment(nextReading(msg.dateString)).format("lll")
      );

      $("#countdown").html(
        "Time until next reading: " + countdownTime(msg.dateString)
      );

      //remove the last reading each new reading to create the scroll effect
      //if the reading is over 200, update the axis
      myChart.data.labels.splice(0, 1);
      myChart.data.datasets[0].data.splice(0, 1);
      if (msg.sgv > 200) {
        myChart.options.scales.y.max = 400;
      }
      // -------

      //finally add reading to the chart and update
      myChart.data.labels.push(moment(msg.dateString).format("hh:mm a"));
      myChart.data.datasets[0].data.push(msg.sgv);
      myChart.update();
    });
  });