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
        backgroundColor: isDone ? "rgba(250, 250, 250, 1)" : "rgba(255, 255, 255, 1)",
        width: "24rem",
        padding: "1.5rem",
        borderRadius: "16px",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        margin: "2rem auto",
        border: `1px solid ${isDone ? "#e4e4e7" : "#f4f4f5"}`,
      }}
    >
      <div>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{
            color: "#8b5cf6",
            fontSize: "1.2rem",
            fontWeight: "600",
            marginBottom: "0.5rem"
          }}>{`Closing Date: ${closingDate}`}</h3>
          <div style={{ 
            display: "flex", 
            gap: "1rem", 
            color: "#71717a",
            fontSize: "0.9rem" 
          }}>
            <span>{`Date: ${Date}`}</span>
            <span>{`Time: ${Time}`}</span>
          </div>
        </div>

        <div style={{ 
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "1.5rem"
        }}>
          <div>
            <h4 style={{
              color: "#27272a",
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "0.5rem"
            }}>Payments</h4>
            <div style={{ 
              display: "flex", 
              flexDirection: "column",
              gap: "0.3rem",
              fontSize: "0.9rem",
              color: "#52525b"
            }}>
              <span>{`Card 28: ${Number(card_28).toFixed(2)}kr.`}</span>
              <span>{`Card 43: ${Number(card_43).toFixed(2)}kr.`}</span>
              <span>{`Mobile Pay: ${Number(mobile_pay).toFixed(2)}kr.`}</span>
              <span>{`Invoices: ${Number(invoices).toFixed(2)}kr.`}</span>
            </div>
          </div>

          <div>
            <h4 style={{
              color: "#27272a",
              fontSize: "1rem",
              fontWeight: "600",
              marginBottom: "0.5rem"
            }}>Cash Details</h4>
            <div style={{ 
              display: "flex", 
              flexDirection: "column",
              gap: "0.3rem",
              fontSize: "0.9rem",
              color: "#52525b"
            }}>
              <span>{`Notes: ${totalNotes.toFixed(2)}kr.`}</span>
              <span>{`Coins: ${totalCoins.toFixed(2)}kr.`}</span>
              <span style={{ color: "#577590" }}>{`Needed: ${neededCash.toFixed(2)}kr.`}</span>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: "#fafafa",
          padding: "1rem",
          borderRadius: "12px",
          marginBottom: "1.5rem",
          border: "1px solid #f4f4f5"
        }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            marginBottom: "0.5rem",
            color: "#27272a"
          }}>
            <span>Cash Difference:</span>
            <span style={{
              color: totalCash + neededCash <= 0 ? "#dc2626" : "#059669",
              fontWeight: "600"
            }}>{`${cashDiff.toFixed(2)}kr.`}</span>
          </div>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            color: "#27272a"
          }}>
            <span>Cash Income:</span>
            <span style={{
              color: incomeCash <= 0 ? "#dc2626" : "#059669",
              fontWeight: "600"
            }}>{`${Number(incomeCash).toFixed(2)}kr.`}</span>
          </div>
        </div>

        {+cashOut && (
          <div style={{
            backgroundColor: "#fef2f2",
            padding: "1rem",
            borderRadius: "12px",
            marginBottom: "1.5rem",
            border: "1px solid #fee2e2"
          }}>
            <h4 style={{ color: "#dc2626", marginBottom: "0.5rem", fontWeight: "600" }}>Cash Out Details</h4>
            <p style={{ color: "#ef4444" }}>{`Amount: ${Number(cashOut).toFixed(2)}kr.`}</p>
            <p style={{ color: "#52525b" }}>{`Reason: ${reason}`}</p>
          </div>
        )}

        <div style={{ marginBottom: "1.5rem" }}>
          <h4 style={{ 
            color: "#27272a",
            marginBottom: "0.5rem",
            fontWeight: "600"
          }}>Comments</h4>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "1rem",
            minHeight: "100px",
            borderRadius: "12px",
            border: "1px solid #e4e4e7"
          }}>
            <p style={{ color: "#71717a" }}>{comments || "No Comments!"}</p>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid #e4e4e7",
          paddingTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <p style={{ color: "#52525b", fontSize: "0.9rem" }}>{`Closed by: ${close_by}`}</p>
            {update_by && (
              <p style={{ color: "#52525b", fontSize: "0.9rem" }}>{`Edit by: ${update_by}`}</p>
            )}
          </div>

          <div style={{ 
            display: "flex",
            gap: "0.5rem" 
          }}>
            {admin.includes(user.email) && (
              !loading ? (
                <CircularProgress size={24} style={{ color: "#8b5cf6" }} />
              ) : (
                <Button
                  onClick={() => setISDone(!isDone)}
                  style={{
                    backgroundColor: isDone ? "#dc2626" : "#059669",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      opacity: 0.9
                    }
                  }}
                >
                  {isDone ? "Done" : "Not Done"}
                </Button>
              )
            )}
            <Button
              href={{
                pathname: `/dashboard`,
                query: { id: id },
              }}
              style={{
                backgroundColor: "#8b5cf6",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#7c3aed"
                }
              }}
            >
              Edit
            </Button>
          </div>
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
