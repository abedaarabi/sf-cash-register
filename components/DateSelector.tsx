import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";

export function DateSelector({ getdate }: any) {
  const [date, setDate] = React.useState({ startDate: "", endDate: "" }) as any;

  return (
    <div
      style={{
        display: "flex",
        marginTop: "0.5rem",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",

          alignItems: "baseline",
          justifyContent: "space-around",
        }}
      >
        <TextField
          style={{ padding: " 0 5px" }}
          type={"date"}
          value={date?.startDate}
          onChange={(e: any) => {
            setDate({ ...date, startDate: e.target.value });
          }}
        />
        <TextField
          style={{ marginTop: "0.5rem" }}
          type={"date"}
          value={date?.endDate}
          onChange={(e: any) => {
            setDate({ ...date, endDate: e.target.value });
          }}
        />
      </div>
      <div>
        <Button onClick={() => getdate(date)}>Filter By Date</Button>
      </div>
    </div>
  );
}

{
  /* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={date?.startDate}
            onChange={(newValue: string | null) => {
              setDate({ ...date, startDate: newValue });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="End Date"
          value={date?.endDate}
          onChange={(newValue: string | null) => {
            setDate({ ...date, endDate: newValue });
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider> */
}
