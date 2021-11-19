const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Glucose mg/dl 5 hour distribution",
        borderColor: "#000",
        backgroundColor: "#000",
        data: [],
        type: "scatter",
        showLine: false,
        pointRadius: 3,
        lineTension: 0
      },
      {
        label: "Delta",
        yAxisID: "d",
        borderColor: "#0073e6",
        backgroundColor: "#99ccff",
        data: [],
        showLine: false,
        pointRadius: 3,
      },
    ],
  },
  options: {
    scales: {
      x: {
        beginAtZero: true,
        reverse: false
      },
      y: {
        max: 200,
        min: 30,
        beginAtZero: true,
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return value + " mg/dL";
          },
        },
        gridLines: {
          drawBorder: false,
        },
      },
      d: {
        max: -15,
        min: 15,
        position: "right"
      },
    },
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: 60,
            yMax: 60,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            label: {
              content: (ctx) => "60",
              enabled: true,
              color: "#fff",
              backgroundColor: "rgb(255, 99, 132)",
            },
          },
          line2: {
            type: "line",
            yMin: 180,
            yMax: 180,
            borderColor: "#f5b942",
            borderWidth: 2,
            label: {
              content: (ctx) => "180",
              enabled: true,
              color: "#fff",
              backgroundColor: "#f5b942",
            },
            line3: {
              type: "line",
              scaleID: "d",
              yMin: 0,
              yMax: 0,
              borderColor: "#f5b942",
              borderWidth: 2,
            },
          },
        },
      },
    },
  },
});
