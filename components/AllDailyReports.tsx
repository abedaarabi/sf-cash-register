import React from "react";
import { useAuth } from "../context/AuthContext";
import { admin } from "../helper/emailAdmin";
import styles from "../styles/Home.module.css";
import { GetCloseRegister } from "./GetCloseRegister";
import CircularProgress from "@mui/material/CircularProgress";
import { DateSelector } from "./DateSelector";

export const AllDailyReports = () => {
  const [dailyReport, setDailyReport] = React.useState([]) as any;
  const [loading, setLoading] = React.useState(true);

  function getdate(date: any) {
    if (!date.startDate || !date.endDate) {
      return alert("select dates");
    } else {
      const startDate = date.startDate;
      const endDate = date.endDate;

      fetch(
        `/api/dailyreports/report?startDate=${startDate}&endDate=${endDate} `
      )
        .then((res) => res.json())
        .then(({ response }) => {
          console.log({ response });

          setDailyReport(response || []);
          setLoading(false);
        })

        .catch((err) => console.log(err));
    }
  }

  const { user } = useAuth();

  React.useEffect(() => {
    fetch(`/api/dailyreports/report`)
      .then((res) => res.json())
      .then(({ response }) => {
        console.log({ response });

        setDailyReport(response || []);
        setLoading(false);
      })

      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return (
      <h2 className={styles.container}>
        <CircularProgress />
      </h2>
    );
  }

  const fakeArr = admin.includes(user.email)
    ? dailyReport.slice(1)
    : [dailyReport[dailyReport.length - 1]];

  return (
    <div>
      <div
        style={{
          margin: "auto",
        }}
      >
        {admin.includes(user.email) && <DateSelector getdate={getdate} />}
      </div>
      <div
        style={{
          flexWrap: "wrap",
          display: "flex",

          justifyContent: "space-around",
        }}
      >
        {fakeArr.map((report: any, index: any) => {
          const firstItem = index >= 0 && dailyReport[index];

          const countCoins = {
            twenty_kr: report.twenty_kr,
            ten_kr: report.ten_kr,
            five_kr: report.five_kr,
            two_kr: report.two_kr,
            one_kr: report.one_kr,
            half_kr: report.half_kr,
          };

          const countNote = {
            one_thousand_kr: report.one_thousand_kr,
            five_hundred_kr: report.five_hundred_kr,
            two_hundred_kr: report.two_hundred_kr,
            one_hundred_kr: report.one_hundred_kr,
            fifty_kr: report.fifty_kr,
          };

          const prevcountCoins = {
            twenty_kr: firstItem.twenty_kr,
            ten_kr: firstItem.ten_kr,
            five_kr: firstItem.five_kr,
            two_kr: firstItem.two_kr,
            one_kr: firstItem.one_kr,
            half_kr: firstItem.half_kr,
          };

          const prevcountNote = {
            one_thousand_kr: firstItem.one_thousand_kr,
            five_hundred_kr: firstItem.five_hundred_kr,
            two_hundred_kr: firstItem.two_hundred_kr,
            one_hundred_kr: firstItem.one_hundred_kr,
            fifty_kr: firstItem.fifty_kr,
          };

          const prevCoins = getTotal(prevcountCoins);
          const prevNotes = getTotal(prevcountNote);

          const coins = getTotal(countCoins);
          const notes = getTotal(countNote);

          const prevFDC = prevCoins + prevNotes - (firstItem?.cashOut || 0);

          return (
            <div key={report.id}>
              <GetCloseRegister
                dailyReport={report}
                prevFDC={prevFDC}
                totalCoins={coins}
                totalNotes={notes}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const getTotal = (obj: any) => {
  let total = 0;

  for (const key in obj) {
    const element = +obj[key];
    total += element;
  }
  return total;
};
