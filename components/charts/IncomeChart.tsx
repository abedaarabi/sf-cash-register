import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { CircularProgress } from "@mui/material";

import styles from "../../styles/Home.module.css";
import { DateSelector } from "../DateSelector";
Chart.register(CategoryScale);
const IncomeChart = () => {
  const [dailyReport, setDailyReport] = React.useState([]) as any;
  const [loading, setLoading] = React.useState(true);

  function getdate(date: any) {
    if (!date.startDate || !date.endDate) {
      return alert("select dates");
    } else {
      setLoading(true);
      const startDate = date.startDate;
      const endDate = date.endDate;

      fetch(
        `/api/dailyreports/report?startDate=${startDate}&endDate=${endDate} `
      )
        .then((res) => res.json())
        .then(({ response }) => {
          const result = response.sort(
            (a: Date, b: Date) =>
              // @ts-ignore
              new Date(a.closingDate) - new Date(b.closingDate)
          );

          const chartLabel = result.map((item: any) => item.closingDate);
          const chartDataset = result.map((item: any) => {
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
    }
  }

  React.useEffect(() => {}, [loading]);
  React.useEffect(() => {
    fetch(`/api/dailyreports/report`)
      .then((res) => res.json())
      .then(({ response }) => {
        const result = response.sort(
          (a: Date, b: Date) =>
            // @ts-ignore
            new Date(a.closingDate) - new Date(b.closingDate)
        );

        const chartLabel = result.map((item: any) => item.closingDate);
        const chartDataset = result.map((item: any) => {
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

  return (
    <div className={styles.charts}>
      <DateSelector getdate={getdate} />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={styles.charts}>
            <h2 style={{ color: "#6d6875" }}>
              Total: {Number.parseFloat(dailyReport.total).toFixed(2)} kr
            </h2>
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
        </>
      )}
    </div>
  );
};

export default IncomeChart;
