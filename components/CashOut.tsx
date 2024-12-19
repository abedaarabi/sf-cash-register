import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, Stack, darken } from "@mui/material";

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

  //   const table = useMaterialReactTable({
  //     columns,
  //     data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  //   });

  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        marginTop: "20px",
      }}
    >
      <MaterialReactTable
        enableStickyFooter
        enableColumnFilterModes
        enableColumnOrdering
        enableGrouping
        enableColumnResizing
        data={cash || []}
        columns={columns}
        state={{ isLoading: cashIsLoading }}
        initialState={{ grouping: ["reason"] }}
        enableStickyHeader
        pageCount={60}
        muiTablePaperProps={{
          sx: {
            // borderRadius: "10px",
            overflowX: "scroll",
          },
        }}
        //expand all groups by default
        //an array of columns to group by by default (can be multiple)

        muiTableContainerProps={{
          sx: { overflowX: "scroll" },
        }}
      />
    </Box>
  );
};
function formatToDanishCurrency(amount: number): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  }).format(amount);
}
export default CashOut;
