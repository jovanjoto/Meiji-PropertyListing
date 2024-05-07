import { Line } from "react-chartjs-2";

function ViewCountLineChart({ chartData }) {

  const styles = {
    chartContainer : {
      width : '1000px',
      height : '600px',
    }
  }

  return (
    <div className="" style={styles.chartContainer}>
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
