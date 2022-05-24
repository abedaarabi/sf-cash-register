import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { CircularProgress } from "@mui/material";

import styles from "../../styles/Home.module.css";
Chart.register(CategoryScale);
const IncomeChart = () => {
  const [dailyReport, setDailyReport] = React.useState([]) as any;
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`/api/dailyreports/report`)
      .then((res) => res.json())
      .then(({ response }) => {
        console.log({ response });

        const chartLabel = response.map((item: any) => item.closingDate);
        const chartDataset = response.map((item: any) => {
          return Number(item.productSales);
        });

        const totalItems = chartDataset.reduce(
          (sum: any, item: any) => sum + item
        );

        setDailyReport({
          label: chartLabel,
          data: chartDataset,
          total: totalItems,
        });
        setLoading(false);
      })

      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return (
      <h2 className={styles.container}>
        <CircularProgress />
      </h2>
    );
  }

  console.log(window.innerWidth);

  return (
    <div className={styles.charts}>
      <div className={styles.charts}>
        <h2 style={{ color: "#6d6875" }}>Total: {dailyReport.total} kr</h2>
        <p style={{ color: "#6d6875" }}>
          From: {dailyReport.label[0]} To:
          {dailyReport.label[dailyReport.label.length - 1]}
        </p>
      </div>

      <Line
        height={window.innerWidth < 450 ? 85 : 35}
        width={window.innerWidth < 450 ? 100 : 120}
        datasetIdKey="id"
        data={{
          labels: dailyReport.label,
          datasets: [
            {
              label: "Income",
              data: dailyReport.data,
              //@ts-ignore
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              //@ts-ignore
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 3,
            },
          ],
        }}
      />
    </div>
  );
};

export default IncomeChart;
