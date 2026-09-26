import React from "react";
import { DateSelector } from "../components/DateSelector";
import { PageHeader } from "../components/ui/PageHeader";
import { IconCalendar } from "../components/ui/icons";

const DataResult = () => {
  return (
    <div className="app-shell">
      <PageHeader
        title="Data result"
        subtitle="Pick a date range to inspect"
        icon={<IconCalendar className="h-5 w-5" />}
      />
      <DateSelector />
    </div>
  );
};

export default DataResult;
