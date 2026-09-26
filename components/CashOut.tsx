import React, { useMemo } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box } from "@mui/material";
import { PageHeader } from "./ui/PageHeader";
import { IconBanknote } from "./ui/icons";

type DailyReport = {
  cashOut: string;
  reason: string;
  Date: string;
  closingDate: string;
  comments: string;
};

type ConvertedDailyReport = {
  cashOut: string;
  reason: string;
  Date: Date;
  closingDate: Date;
  comments: string;
};

const CashOut = () => {
  const [cash, setCash] = React.useState<ConvertedDailyReport[]>();
  const [cashIsLoading, setCashIsLoading] = React.useState<boolean>();

  React.useEffect(() => {
    setCashIsLoading(true);
    fetch(`/api/dailyreports/cash`)
      .then((res) => res.json())
      .then(({ response }) => {
        const data = response.map((report: DailyReport) => ({
          cashOut: formatToDanishCurrency(Number(report.cashOut)),
          reason: report.reason,
          Date: report.Date,
          closingDate: report.closingDate,
          comments: report.comments,
        })) as ConvertedDailyReport[];

        setCash(data || []);
        setCashIsLoading(false);
      })

      .catch((err) => console.log(err));
  }, []);

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<ConvertedDailyReport>[]>(
    () => [
      {
        accessorKey: "reason",
        header: "Reason",
        size: 150,
      },
      {
        accessorKey: "cashOut",
        header: "Cash Out",
        size: 150,
        AggregatedCell: ({ cell, table, row }) => {
          // Calculate total for this group
          const groupRows = row.subRows;
          const groupTotal = groupRows?.reduce((sum, row) => {
            const amount = Number(row.getValue<string>("cashOut").replace(/[^0-9,-]/g, '').replace(',', '.'));
            return sum + amount;
          }, 0) || 0;

          return (
            <Box
              sx={{ color: "info.main", fontWeight: "bold" }}
            >
              {formatToDanishCurrency(groupTotal)}
            </Box>
          );
        },
        Footer: () => null,
      },
      {
        accessorKey: "Date", //normal accessorKey
        header: "Date",
        size: 200,
      },
      {
        accessorKey: "closingDate",
        header: "Closing Date",
        size: 150,
      },
      {
        accessorKey: "comments",
        header: "Comment",
        size: 150,
      },
    ],
    []
  );

  return (
    <div className="app-shell">
      <PageHeader
        title="Cash out"
        subtitle="Every withdrawal grouped by reason"
        icon={<IconBanknote className="h-5 w-5" />}
      />

      <MaterialReactTable
        enableStickyFooter
        enableColumnFilterModes
        enableColumnOrdering
        enableGrouping
        enableColumnResizing
        data={cash || []}
        columns={columns}
        state={{ isLoading: cashIsLoading }}
        initialState={{ grouping: ["reason"], density: "compact" }}
        enableStickyHeader
        pageCount={60}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "1.125rem",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          },
        }}
        muiTableHeadCellProps={{
          sx: { backgroundColor: "#F8FAFC", fontWeight: 700 },
        }}
        muiTableContainerProps={{
          sx: { maxHeight: "70vh", overflowX: "auto" },
        }}
      />
    </div>
  );
};
function formatToDanishCurrency(amount: number): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  }).format(amount);
}
export default CashOut;
