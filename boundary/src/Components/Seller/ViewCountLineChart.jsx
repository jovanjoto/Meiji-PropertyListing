import { Line } from "react-chartjs-2";

function ViewCountLineChart({ chartData }) {
  return (
    <div className="w-full">
      <Line
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
export default ViewCountLineChart;
