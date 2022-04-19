import { Button } from "@mui/material";
import { Router, useRouter } from "next/router";
import React from "react";

import { RegisterHours } from "../components/DailyRegiste";

import styles from "../styles/Home.module.css";
const Dashboard = () => {
  const router = useRouter();

  const { id } = router.query;
  return (
    <div className={styles.container}>
      <div>
        <RegisterHours id={id} />
      </div>
    </div>
  );
};

export default Dashboard;
