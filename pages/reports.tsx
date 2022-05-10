import Head from "next/head";
import React from "react";
import { AllDailyReports } from "../components/AllDailyReports";

const Reports = () => {
  // console.log({ response });

  return (
    <div>
      <Head>
        <title>Reports</title>
      </Head>
      <AllDailyReports />
    </div>
  );
};
export default Reports;

// export async function getServerSideProps() {
//   const { response } = await getReports();

//   return {
//     props: { response }, // will be passed to the page component as props
//   };
// }

// async function getReports() {
//   return await (
//     await fetch("http://localhost:3000/api/dailyreports/report")
//   ).json();
// }
