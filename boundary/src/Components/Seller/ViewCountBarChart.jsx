import { Bar } from "react-chartjs-2";

function ViewCountBarChart({ chartData }) {
  return (
    <div className="w-full">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: ""
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );

}
export default ViewCountBarChart;
