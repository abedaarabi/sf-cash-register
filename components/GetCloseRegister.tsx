import { Button } from "../components/ui/Button";
import React from "react";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";
import { admin } from "../helper/emailAdmin";
import { async } from "@firebase/util";

export const GetCloseRegister = ({ dailyReport, prevFDC }: any) => {
  const { user } = useAuth();
  const { comments, done, _id } = dailyReport;
  const [isDone, setISDone] = React.useState(done);
  const [loading, setLoading] = React.useState(false);
  const { countNote } = dailyReport;
  // const { done } = dailyReport;
  const { productSales } = dailyReport.sales;
  const { countCoins, cashOut } = dailyReport;
  const { card28, card43, mobilePay, invoices } = dailyReport.payments;

  // console.log(done, "done", loading, "loading", isDone, "isDone");

  const note = getTotal(countNote);
  const coins = getTotal(countCoins);
  const payment = getTotal(dailyReport.payments);
  const neededCash = payment - prevFDC - productSales;
  const totalCash = coins + note - cashOut?.amount || 0;
  const incomeCash = coins + note - prevFDC;
  const cashDiff = totalCash + neededCash;
  async function updateDone() {
    try {
      setLoading(false);
      await doneNotDone(user.id, _id, isDone);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    updateDone();
  }, [isDone]);

  return (
    <div
      style={{
        backgroundColor: isDone ? "#ffb3c1" : "#e9ecef",
        display: "flex",
        width: "20rem",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "2rem",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
        marginBottom: "30px",
      }}
    >
      <div>
        <ul>
          <li
            style={{
              color: "tomato",
              listStyle: "none",
              fontStyle: "italic",
            }}
          >{`Closing Date: ${dailyReport.closingDate}`}</li>
          <li>{`Date: ${dailyReport.date}`}</li>
          <li>{`Time: ${dailyReport.time}`}</li>

          <li
            style={{
              color: "#4a4e69",
              listStyle: "none",
              marginLeft: "-2rem",
            }}
          >
            Payments:
          </li>
          <li>{`card 28: ${card28.toFixed(2)}kr.`}</li>
          <li>{`card 43: ${card43.toFixed(2)}kr.`}</li>
          <li>{`Mobile Pay: ${mobilePay.toFixed(2)}kr.`}</li>
          <li>{`Invoices: ${invoices.toFixed(2)}kr.`}</li>
          <li>{`Opening FDC ${prevFDC.toFixed(2)}kr`}</li>
          <li
            style={{ color: "#52b788", listStyle: "none", margin: "5% -2rem " }}
          >{`Total Sales: ${payment}kr.`}</li>
          <li
            style={{ color: "#4a4e69", listStyle: "none", marginLeft: "-2rem" }}
          >
            Sales:
          </li>
          <li>{`Product Sales: ${productSales.toFixed(2)}kr.`}</li>
          <li
            style={{ color: "#4a4e69", listStyle: "none", marginLeft: "-2rem" }}
          >
            Cash:
          </li>
          <li>{`Note: ${note.toFixed(2)}kr.`}</li>
          <li>{`Coins: ${coins.toFixed(2)}kr.`}</li>

          <li
            style={{ color: "#577590", listStyle: "none", marginLeft: "-2rem" }}
          >{`Needed Cash ${neededCash.toFixed(2)}kr.`}</li>
        </ul>
        <ul>
          <li
            style={{
              color: totalCash + neededCash <= 0 ? "#d90429" : "#0a9396",
            }}
          >{`Cash difference ${cashDiff.toFixed(2)}kr.`}</li>
          <li
            style={{
              color: incomeCash <= 0 ? "#d90429" : "#0a9396",
            }}
          >{`Cash income ${incomeCash.toFixed(2)}kr.`}</li>
        </ul>
        <h4 style={{ color: "red" }}>
          Cash Out {cashOut?.amount?.toFixed(2) || 0}
        </h4>
        <h4
          style={{ color: "#61a5c2", listStyle: "none" }}
        >{`Close FDC: ${totalCash.toFixed(2)}kr.`}</h4>
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
          <p
            style={{ color: "#001219" }}
          >{`Closed by: ${dailyReport.closedBy.toUpperCase()}`}</p>
        </div>

        {admin.includes(user.email) && (
          <div>
            {!loading ? (
              <p>loading</p>
            ) : (
              <Button
                onClick={() => {
                  setISDone(!isDone);
                }}
              >
                {isDone ? "Done" : "Not Done"}
              </Button>
            )}
          </div>
        )}
        <div style={{ marginBottom: "15px" }}>
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

async function doneNotDone(id: string, _id: string, isDone: boolean) {
  try {
    await fetch("/api/editdone/" + id, {
      method: "POST",
      body: JSON.stringify({ done: isDone, id: _id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}
