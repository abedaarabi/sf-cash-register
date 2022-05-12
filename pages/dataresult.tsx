import { useRouter } from "next/router";
import React from "react";
import { AllDailyReports } from "../components/AllDailyReports";
import { DateSelector } from "../components/DateSelector";

import { useAuth } from "../context/AuthContext";

const DataResult = () => {
  const { user } = useAuth();

  return (
    <div>
      <DateSelector />
    </div>
  );
};

export default DataResult;
