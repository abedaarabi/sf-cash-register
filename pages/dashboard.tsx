import { Button } from "@mui/material";
import { Router, useRouter } from "next/router";
import React from "react";
import { RegisterHours } from "../components/RegisterHours";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";
const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div>
        <RegisterHours />
      </div>
    </div>
  );
};

export default Dashboard;
