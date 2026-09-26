import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

import { DateSelector } from "../DateSelector";
import { PageHeader } from "../ui/PageHeader";
import { StatTile } from "../ui/Stat";
import { PageLoader } from "../ui/Loading";
import { IconCalendar, IconChart, IconReceipt } from "../ui/icons";

Chart.register(CategoryScale);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#0F172A",
      padding: 12,
      cornerRadius: 12,
      titleFont: { weight: "600" as const },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#94A3B8", maxRotation: 0, autoSkipPadding: 16 },
    },
    y: {
      border: { display: false },
      grid: { color: "#E2E8F0" },
      ticks: { color: "#94A3B8" },
    },
  },
};

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
    <div className="app-shell">
      <PageHeader
        title="Income overview"
        subtitle="Product sales per closed register"
        icon={<IconChart className="h-5 w-5" />}
      />

      <div className="mb-6">
        <DateSelector getdate={getdate} />
      </div>

      {loading ? (
        <PageLoader label="Crunching numbers…" />
      ) : (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <StatTile
              label="Total income"
              value={convertCurrencyToal(dailyReport.total)}
              tone="brand"
              icon={<IconReceipt className="h-5 w-5" />}
            />
            <StatTile
              label="Period"
              value={`${dailyReport.label[0]} → ${
                dailyReport.label[dailyReport.label.length - 1]
              }`}
              tone="sky"
              icon={<IconCalendar className="h-5 w-5" />}
              hint={`${dailyReport.label.length} closing days`}
            />
          </div>

          <div className="card p-4 sm:p-6">
            <div className="h-72 w-full sm:h-96">
              <Bar
                datasetIdKey="id"
                options={chartOptions as any}
                data={{
                  labels: dailyReport.label,
                  datasets: [
                    {
                      label: "Income",
                      data: dailyReport.data,
                      backgroundColor: "rgba(99, 102, 241, 0.85)",
                      hoverBackgroundColor: "rgba(67, 56, 202, 0.95)",
                      borderRadius: 8,
                      borderSkipped: false,
                      maxBarThickness: 48,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IncomeChart;

export function convertCurrencyToal(currency: number) {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  }).format(currency);
}
