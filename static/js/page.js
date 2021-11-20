$(document).ready(function () {
  socket.on("disconnect", () => {
    window.location.reload();
  });

  socket.on("retro", function (history) {
    i = history.length - 1;
    myChart.data.datasets[1].data.push(0); //push placeholder bar because we don't know data we don't have
    while (i > 0) {
      //drop the last reading by stopping at 1.  There will be emit of most recent reading outside of retro emission
      myChart.data.labels.push(moment(history[i].dateString).format("hh:mm a"));
      myChart.data.datasets[0].data.push(history[i].sgv);
      myChart.data.datasets[1].data.push(history[i - 1].sgv - history[i].sgv);

      i = i - 1;
    }
  });

  socket.on("reading", function (msg) {
    $("#main").html("Reading: " + msg.sgv + " mg/dL");
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
    myChart.data.datasets[1].data.splice(0, 1);

    if (msg.sgv > 200) {
      myChart.options.scales.y.max = 400;
    }
    // -------

    //finally add latest reading to the chart
    myChart.data.labels.push(moment(msg.dateString).format("hh:mm a"));
    myChart.data.datasets[0].data.push(msg.sgv);

    twoback = myChart.data.datasets[0].data.slice(-2)[0]; //go two back to calculate live delta
    var delta = twoback - msg.sgv;
    myChart.data.datasets[1].data.push(-delta);

    console.log(myChart);
    myChart.update(); //update chart
    $(document).prop("title", generateTitle(msg, delta)); //update title
  });
});
