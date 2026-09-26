import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "./ui/Button";
import { IconFilter } from "./ui/icons";

type DateRange = { startDate: string; endDate: string };

export function DateSelector({
  getdate,
  defaultRange,
}: {
  getdate?: (range: DateRange) => void;
  defaultRange?: DateRange;
}) {
  const [date, setDate] = React.useState<DateRange>(
    defaultRange ?? { startDate: "", endDate: "" }
  );

  return (
    <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
      <div className="grid flex-1 gap-3 sm:grid-cols-2">
        <TextField
          label="From"
          type="date"
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={date?.startDate}
          onChange={(e: any) => {
            setDate({ ...date, startDate: e.target.value });
          }}
        />
        <TextField
          label="To"
          type="date"
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={date?.endDate}
          onChange={(e: any) => {
            setDate({ ...date, endDate: e.target.value });
          }}
        />
      </div>
      <Button
        variant="secondary"
        icon={<IconFilter className="h-4 w-4" />}
        onClick={() => getdate && getdate(date)}
        className="sm:w-auto"
        fullWidth
      >
        Filter by date
      </Button>
    </div>
  );
}
