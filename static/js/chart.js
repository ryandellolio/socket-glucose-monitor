const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Glucose mg/dl",
        borderDash: [5, 5],
        borderColor: "#000",
        backgroundColor: "#000",
        data: [],
      },
    ],
  },
  options: {
    scales: {
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
              content: (ctx) => '60',
              enabled: true
            },
          },
          line2: {
            type: "line",
            yMin: 180,
            yMax: 180,
            borderColor: "#f5b942",
            borderWidth: 2,
            label: {
              content: (ctx) => '180',
              enabled: true
            },
          },
        },
      },
    },
  },
});
