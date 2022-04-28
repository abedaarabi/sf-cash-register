import * as React from "react";
import Alert from "@mui/material/Alert";

import Stack from "@mui/material/Stack";

interface Props {
  severity: any;
  msg: string;
}
export const Alerts: React.FC<Props> = ({ severity, msg }) => {
  return (
    <Stack sx={{ width: "80%" }} spacing={4}>
      <Alert severity={severity}>{msg}</Alert>
    </Stack>
  );
};
