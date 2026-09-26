import Head from "next/head";
import React from "react";
import IncomeChart from "../components/charts/IncomeChart";

const chart = () => {
  return (
    <>
      <Head>
        <title>Sorte Firkant - Charts</title>
      </Head>
      <IncomeChart />
    </>
  );
};

export default chart;
