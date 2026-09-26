import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import { RegisterHours } from "../components/DailyRegiste";

const Dashboard = () => {
  const router = useRouter();

  const { id } = router.query;
  return (
    <>
      <Head>
        <title>Sorte Firkant - Register</title>
      </Head>
      <RegisterHours id={id} />
    </>
  );
};

export default Dashboard;
