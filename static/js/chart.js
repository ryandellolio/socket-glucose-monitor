const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Glucose mg/dl",
        data: [],
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return value + " mg/dL";
          },
        },
      },
    },
  },
});
