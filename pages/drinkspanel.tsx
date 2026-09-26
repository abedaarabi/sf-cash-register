import Head from "next/head";
import React from "react";
import { DrinkPanel } from "../components/DrinkPanel";

const drinkdashboard = () => {
  return (
    <>
      <Head>
        <title>Sorte Firkant - Drink Panel</title>
      </Head>
      <DrinkPanel />
    </>
  );
};

export default drinkdashboard;
