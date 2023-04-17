import { Button } from "../components/ui/Button";
import React from "react";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";
import { admin } from "../helper/emailAdmin";
import { async } from "@firebase/util";
import { CircularProgress } from "@mui/material";

export const GetCloseRegister = ({
  dailyReport,
  prevFDC,
  totalCoins,
  totalNotes,
}: any) => {
  const { user } = useAuth();

  const {
    Date,
    Time,
    card_28,
    card_43,
    cashOut,
    close_by,
    closingDate,
    comments,
    done,
    employeId,
    fifty_kr,
    five_hundred_kr,
    five_kr,
    half_kr,
    id,
    invoices,
    mobile_pay,
    one_hundred_kr,
    one_kr,
    one_thousand_kr,
    other,
    productSales,
    reason,
    ten_kr,
    twenty_kr,
    two_hundred_kr,
    two_kr,
    update_by,
  } = dailyReport;

  // const { comments, done, _id } = dailyReport;
  const [isDone, setISDone] = React.useState(done);
  const [loading, setLoading] = React.useState(false);
  //- Number(cashOut);
  const payments = { card_28, card_43, mobile_pay, invoices };
  const payment = getTotal(payments);
  const neededCash = payment - prevFDC - productSales;
  const totalCash = totalCoins + totalNotes;
  const incomeCash = totalCoins + totalNotes - prevFDC;
  const cashDiff = totalCash + neededCash;
  const CloseFDC = totalCash - Number(cashOut);

  async function updateDone() {
    try {
      setLoading(false);
      await doneNotDone(id, isDone);
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
        backgroundColor: isDone ? "#ffb3c1" : "#a8dadc",
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
          >{`Closing Date: ${closingDate}`}</li>
          <li>{`Date: ${Date}`}</li>
          <li>{`Time: ${Time}`}</li>

          <li
            style={{
              color: "#4a4e69",
              listStyle: "none",
              marginLeft: "-2rem",
            }}
          >
            Payments:
          </li>
          <li>{`card 28: ${Number(card_28).toFixed(2)}kr.`}</li>
          <li>{`card 43: ${Number(card_43).toFixed(2)}kr.`}</li>
          <li>{`Mobile Pay: ${Number(mobile_pay).toFixed(2)}kr.`}</li>
          <li>{`Invoices: ${Number(invoices).toFixed(2)}kr.`}</li>
          <li>{`Opening FDC ${Number(prevFDC).toFixed(2)}kr`}</li>
          <li
            style={{ color: "#52b788", listStyle: "none", margin: "5% -2rem " }}
          >{`Total Sales: ${payment}kr.`}</li>
          <li
            style={{ color: "#4a4e69", listStyle: "none", marginLeft: "-2rem" }}
          >
            Sales:
          </li>
          <li>{`Product Sales: ${Number(productSales).toFixed(2)}kr.`}</li>
          <li
            style={{ color: "#4a4e69", listStyle: "none", marginLeft: "-2rem" }}
          >
            Cash:
          </li>
          <li>{`Note: ${totalNotes.toFixed(2)}kr.`}</li>
          <li>{`Coins: ${totalCoins.toFixed(2)}kr.`}</li>

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
          >{`Cash income ${Number(incomeCash).toFixed(2)}kr.`}</li>
        </ul>
        {+cashOut ? (
          <h4 style={{ color: "red" }}>
            Cash Out {Number(cashOut).toFixed(2)}kr. | Reason: {reason}
          </h4>
        ) : (
          <h4 style={{ color: "red" }}>No Cash Out!</h4>
        )}
        <h4
          style={{ color: "#61a5c2", listStyle: "none" }}
        >{`Close FDC: ${CloseFDC.toFixed(2)}kr.`}</h4>
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
          <p style={{ color: "#001219" }}>{`Closed by: ${close_by}  `}</p>
          {update_by && (
            <p style={{ color: "#001219" }}>{`Edit by: ${update_by}  `}</p>
          )}
        </div>

        {admin.includes(user.email) && (
          <div>
            {!loading ? (
              <CircularProgress />
            ) : (
              <Button
                style={{ marginBottom: "1rem" }}
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
                id: id,
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
    const element = +obj[key];
    total += element;
  }
  return total;
};

async function doneNotDone(id: string, isDone: boolean) {
  try {
    await fetch("/api/dailyreports/done", {
      method: "POST",
      body: JSON.stringify({ done: isDone, id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}
