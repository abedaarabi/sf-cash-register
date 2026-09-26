import Head from "next/head";
import React from "react";
import { AllDailyReports } from "../components/AllDailyReports";

const Reports = () => {
  return (
    <>
      <Head>
        <title>Reports</title>
      </Head>
      <AllDailyReports />
    </>
  );
};

export default Reports;
