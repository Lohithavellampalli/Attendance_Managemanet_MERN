import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AttendanceChart({
  present,
  absent,
  halfDay,
}) {
  const data = {
    labels: ["Present", "Absent", "Half Day"],
    datasets: [
      {
        label: "Employees",
        data: [present, absent, halfDay],
      },
    ],
  };

  return (
    <div
      style={{
        width: "700px",
        margin: "30px auto",
      }}
    >
      <Bar data={data} />
    </div>
  );
}

export default AttendanceChart;