import { Button } from "../components/ui/Button";
import React from "react";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";

/**
 * 
 * @returns 
 * mongodbUsername=blog_data
mongodbPass=test123
 */
export const GetCloseRegister = () => {
  const date = new Date();
  const [dailyReport, setDailyReport] = React.useState(null) as any;
  const [loading, setLoading] = React.useState(true);
  const [done, setDone] = React.useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    fetch("/api/register-hours/" + user.uid)
      .then((res) => res.json())
      .then(({ response }) => {
        setDailyReport(response[response.length - 1]);
        setLoading(false);
      });
  }, [user.uid]);

  if (loading) {
    return <h2 className={styles.container}>Loading...</h2>;
  }
  const { countNote } = dailyReport;
  const { countCoins } = dailyReport;
  const { card28, card43, mobilePay, invoices } = dailyReport.payments;
  const { productSales } = dailyReport;
  console.log(dailyReport);

  const note = getTotal(countNote);
  const coins = getTotal(countCoins);
  const payment = getTotal(dailyReport.payments);

  const yy = true;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: done ? "#ef233c" : "lightgray",
        width: "23%",
        margin: "1rem",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
      }}
    >
      <div>
        <ul>
          <li>{`Date: ${dailyReport.date.date}`}</li>
          <pre>___________________________ </pre>
          <h4>Payments</h4>
          <li>{`card 28: ${card28}.0 kr.`}</li>
          <li>{`card 43: ${card43}.0 kr.`}</li>
          <li>{`Mobile Pay: ${mobilePay}.0 kr.`}</li>
          <li>{`invoices: ${invoices}.0 kr.`}</li>
          <pre>___________________________ </pre>
          <li style={{ color: "white" }}>{`Total Sales: ${payment}.0 kr.`}</li>
          <h4>cash</h4>
          <li>{`Note: ${note}.0 kr.`}</li>
          <li>{`Coins: ${coins}.0 kr.`}</li>
        </ul>
      </div>
      <Button onClick={() => setDone(!done)}>
        {done ? "Not Done" : "Done"}
      </Button>
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
