$(document).ready(function () {
  socket.on("disconnect", () => {
    window.location.reload();
  });

  socket.on("retro", function (history) {
    i = history.length - 1;
    myChart.data.datasets[1].data.push(null); //we don't know what came before the retro values

    while (i != 0) {
      myChart.data.labels.push(moment(history[i].dateString).format("hh:mm a"));
      myChart.data.datasets[0].data.push(history[i].sgv);
      if (i != 1) {
        //don't show the last delta lest it gets repeated in the reading display
        myChart.data.datasets[1].data.push(history[i - 1].sgv - history[i].sgv);
      }
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

    if (msg.sgv > 180) {
      myChart.options.scales.y.max = 400;
    }
    // -------

    //finally add latest reading to the chart
    myChart.data.labels.push(moment(msg.dateString).format("hh:mm a"));
    myChart.data.datasets[0].data.push(msg.sgv);

    twoback = myChart.data.datasets[0].data.slice(-2)[0];
    var delta = msg.sgv - twoback;
    myChart.data.datasets[1].data.push(delta);

    //remove the last reading each new reading to create the scroll effect
    //if the reading is over 200, update the axis
    myChart.data.labels.shift();
    myChart.data.datasets[0].data.shift();
    myChart.data.datasets[1].data.shift();

    console.log(myChart.data.labels);
    console.log(myChart.data.datasets[0].data);
    console.log(myChart.data.datasets[1].data);
    console.log("Delta: " + delta);

    myChart.update(); //update chart
    $(document).prop("title", generateTitle(msg, delta)); //update title
  });
});
