const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Glucose mg/dl",
        borderDash: [5, 5],
        borderColor: "#bae755",
        backgroundColor: "#bae755",
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
