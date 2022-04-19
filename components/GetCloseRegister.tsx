import { Button } from "../components/ui/Button";
import React from "react";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";
import { admin } from "../helper/emailAdmin";

export const GetCloseRegister = ({ dailyReport, prevFDC }: any) => {
  const { user } = useAuth();
  const [done, setDone] = React.useState(false);
  const { countNote } = dailyReport;
  // const { done } = dailyReport;
  const { productSales } = dailyReport.sales;
  const { countCoins } = dailyReport;
  const { card28, card43, mobilePay, invoices } = dailyReport.payments;

  const { comments } = dailyReport;

  const note = getTotal(countNote);
  const coins = getTotal(countCoins);
  const payment = getTotal(dailyReport.payments);
  const neededCash = payment - prevFDC - productSales;
  const totalCash = coins + note;
  const incomeCash = coins + note - prevFDC;
  return (
    <div
      style={{
        backgroundColor: done ? "#ffb3c1" : "#e9ecef",
        display: "flex",
        width: "20rem",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "2rem",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
      }}
    >
      <div>
        <ul>
          <li>{`Date: ${dailyReport.date}`}</li>
          <li>{`Time: ${dailyReport.time}`}</li>

          <li
            style={{ color: "#4a4e69", listStyle: "none", marginLeft: "-2rem" }}
          >
            Payments:
          </li>
          <li>{`card 28: ${card28}.0 kr.`}</li>
          <li>{`card 43: ${card43}.0 kr.`}</li>
          <li>{`Mobile Pay: ${mobilePay}.0 kr.`}</li>
          <li>{`Invoices: ${invoices}.0 kr.`}</li>
          <li>{`Opening FDC ${prevFDC}.0kr`}</li>
          <li
            style={{ color: "#52b788", listStyle: "none", margin: "5% -2rem " }}
          >{`Total Sales: ${payment}.0 kr.`}</li>
          <li
            style={{ color: "#4a4e69", listStyle: "none", marginLeft: "-2rem" }}
          >
            Sales:
          </li>
          <li>{`Product Sales: ${productSales}.0 kr.`}</li>
          <li
            style={{ color: "#4a4e69", listStyle: "none", marginLeft: "-2rem" }}
          >
            Cash:
          </li>
          <li>{`Note: ${note}.0 kr.`}</li>
          <li>{`Coins: ${coins}.0 kr.`}</li>
          <li
            style={{ color: "#61a5c2", listStyle: "none", marginLeft: "-2rem" }}
          >{`Total: ${totalCash}.0 kr.`}</li>
          <li
            style={{ color: "#577590", listStyle: "none", marginLeft: "-2rem" }}
          >{`Needed Cash ${neededCash}.0 kr.`}</li>
        </ul>
        <ul>
          <li
            style={{
              color: totalCash + neededCash <= 0 ? "#d90429" : "#0a9396",
            }}
          >{`Cash difference ${totalCash + neededCash}.0 kr.`}</li>
          <li
            style={{
              color: incomeCash <= 0 ? "#d90429" : "#0a9396",
            }}
          >{`Cash income ${incomeCash}.0 kr.`}</li>
        </ul>
        <h4 style={{ color: "#4a4e69" }}>Comments:</h4>
        <div
          style={{
            backgroundColor: "#ffffff",
            // width: "80%",
            height: "150px",
            color: "gray",
            padding: " 0 10px",

            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
          }}
        >
          <p>{comments ? comments : "No Comments!"}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "column",
          marginBottom: "5px",
        }}
      >
        <div>
          <p style={{ color: "#001219" }}>{`Closed by: ${user.email
            .split("@")[0]
            .toUpperCase()}`}</p>
        </div>

        {admin.includes(user.email) && (
          <Button onClick={() => setDone(!done)}>
            {done ? "Done" : "Not Done"}
          </Button>
        )}
        <div>
          <Button
            href={{
              pathname: `/dashboard`,
              query: {
                id: dailyReport._id,
              },
            }}
          >
            Edit
          </Button>
        </div>
      </div>
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

async function DoneNotDone(id: string, userId: string) {
  fetch("/api/register-hours/" + userId, {
    method: "POST",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
