import React from "react";
import { useAuth } from "../context/AuthContext";
import { admin } from "../helper/emailAdmin";
import styles from "../styles/Home.module.css";
import { GetCloseRegister } from "./GetCloseRegister";

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
            : [response[response.length - 1]]
        );
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <h2 className={styles.container}>Loading...</h2>;
  }

  const fakeArr = dailyReport.splice(0, 1);
  return (
    <div
      style={{
        flexWrap: "wrap",
        display: "flex",
        // alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {fakeArr.map((reporet: any, index: any) => {
        const { countCoins, countNote } =
          index >= 1 ? dailyReport[index - 1] : 0;

        const coins = getTotal(countCoins);

        const notes = getTotal(countNote);
        const prevFDC = coins + notes;

        return (
          <div key={reporet._id}>
            <GetCloseRegister dailyReport={reporet} prevFDC={prevFDC} />
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
