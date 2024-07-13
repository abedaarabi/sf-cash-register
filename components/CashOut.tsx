import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, darken } from "@mui/material";

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
        accessorKey: "cashOut", //access nested data with dot notation
        header: "Cash Out",
        size: 150,
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
        enableStickyHeader
        pageCount={60}
        muiTablePaperProps={{
          sx: {
            // borderRadius: "10px",
            overflowX: "scroll",
          },
        }}
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
