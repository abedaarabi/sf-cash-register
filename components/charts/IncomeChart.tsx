import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

import { getDefaultClosingDateRange } from "../../helper/closingDateRange";
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

const defaultRange = getDefaultClosingDateRange();

const IncomeChart = () => {
  const [dailyReport, setDailyReport] = React.useState([]) as any;
  const [loading, setLoading] = React.useState(true);

  async function getdate(date: any) {
    if (!date.startDate || !date.endDate) {
      alert("select dates");
      return;
    }

    setLoading(true);
    const params = new URLSearchParams({
      startDate: date.startDate,
      endDate: date.endDate,
    });

    try {
      const res = await fetch(`/api/dailyreports/report?${params}`);
      const body = await res.json();
      if (!res.ok) {
        alert(body.message || "Could not load reports for those dates.");
        return;
      }

      const result = (body.response ?? []).sort(
        (a: { closingDate: string }, b: { closingDate: string }) =>
          a.closingDate.localeCompare(b.closingDate)
      );

      const chartLabel = result.map((item: any) => item.closingDate);
      const chartDataset = result.map((item: any) => Number(item.productSales));
      const totalItems = chartDataset.reduce(
        (sum: number, item: number) => sum + item,
        0
      );

      setDailyReport({
        label: chartLabel,
        data: chartDataset,
        total: totalItems,
      });
    } catch (err) {
      console.error(err);
      alert("Could not load reports for those dates.");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getdate(defaultRange);
  }, []);

  return (
    <div className="app-shell">
      <PageHeader
        title="Income overview"
        subtitle="Product sales per closed register"
        icon={<IconChart className="h-5 w-5" />}
      />

      <div className="mb-6">
        <DateSelector getdate={getdate} defaultRange={defaultRange} />
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
              value={
                dailyReport.label.length
                  ? `${dailyReport.label[0]} → ${
                      dailyReport.label[dailyReport.label.length - 1]
                    }`
                  : "No closings in range"
              }
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
