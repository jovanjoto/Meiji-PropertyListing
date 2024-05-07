import { Bar } from "react-chartjs-2";

function ViewCountBarChart({ chartData }) {

  const styles = {
    chartContainer : {
      width : '1000px',
      height : '600px',
    }
  }

  return (
    <div className="" style={styles.chartContainer}>
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
