import { useRouter } from "next/router";
import React from "react";
import { AllDailyReports } from "../components/AllDailyReports";

import { useAuth } from "../context/AuthContext";

const DataResult = () => {
  const { user } = useAuth();


  return (
    <div>
      <AllDailyReports />
    </div>
  );
};

export default DataResult;
