import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";

export function DateSelector({ getdate }: any) {
  const [date, setDate] = React.useState({ startDate: "", endDate: "" }) as any;

  return (
    // <>
    //   <LocalizationProvider dateAdapter={AdapterDateFns}>
    //     <DatePicker
    //       label="Start Date"
    //       value={date?.startDate}
    //       onChange={(newValue: string | null) => {
    //         setDate({ ...date, startDate: newValue });
    //       }}
    //       renderInput={(params) => <TextField {...params} />}
    //     />
    //   </LocalizationProvider>

    //   <LocalizationProvider dateAdapter={AdapterDateFns}>
    //     <DatePicker
    //       label="End Date"
    //       value={date?.endDate}
    //       onChange={(newValue: string | null) => {
    //         setDate({ ...date, endDate: newValue });
    //       }}
    //       renderInput={(params) => <TextField {...params} />}
    //     />
    //   </LocalizationProvider>
    //   <Button onClick={() => getdate(date)}>Get Date</Button>
    // </>

    <div>
      <TextField
        type={"date"}
        inputProps={{ min: "2022-04-01", max: "2024-01-01" }}
        value={date?.startDate}
        onChange={(newValue: string | any) => {
          setDate({ ...date, startDate: newValue.target.value });
        }}
      />
      <TextField
        type={"date"}
        inputProps={{ min: "2022-04-01", max: "2024-01-01" }}
        value={date?.endDate}
        onChange={(newValue: string | any) => {
          setDate({ ...date, endDate: newValue.target.value });
        }}
      />
      <Button onClick={() => getdate(date)}>Get Date</Button>
    </div>
  );
}
