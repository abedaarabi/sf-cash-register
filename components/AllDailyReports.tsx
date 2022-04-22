import React from "react";
import { useAuth } from "../context/AuthContext";
import { admin } from "../helper/emailAdmin";
import styles from "../styles/Home.module.css";
import { GetCloseRegister } from "./GetCloseRegister";
import CircularProgress from "@mui/material/CircularProgress";
export const AllDailyReports = () => {
  const [dailyReport, setDailyReport] = React.useState([]) as any;
  const [loading, setLoading] = React.useState(true);

  const { user } = useAuth();

  React.useEffect(() => {
    fetch("/api/register-hours/" + user.uid)
      .then((res) => res.json())
      .then(({ response }) => {
        setDailyReport(
          admin.includes(user.email)
            ? response
            : [response[response.length - 1]] || []
        );
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [user]);

  if (loading) {
    return (
      <h2 className={styles.container}>
        <CircularProgress />
      </h2>
    );
  }

  const fakeArr = dailyReport.slice(1);

  return (
    <div
      style={{
        flexWrap: "wrap",
        display: "flex",
        // alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {fakeArr.map((report: any, index: any) => {
        const { countCoins, countNote, cashOut } =
          index >= 0 && dailyReport[index];

        const coins = getTotal(countCoins);

        const notes = getTotal(countNote);

        const prevFDC = coins + notes - (cashOut?.amount || 0);

        return (
          <div key={report._id}>
            <GetCloseRegister dailyReport={report} prevFDC={prevFDC} />
          </div>
        );
      })}
    </div>
  );
};

const getTotal = (obj: any) => {
  let total = 0;

  for (const key in obj) {
    const element = obj[key];
    total += element;
  }
  return total;
};
