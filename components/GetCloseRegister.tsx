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
  const totalCash = totalCoins + totalNotes - Number(cashOut);
  const incomeCash = totalCoins + totalNotes - prevFDC;
  const cashDiff = totalCash + neededCash;
  const CloseFDC = totalCash - Number(cashOut);
console.log(CloseFDC, "CloseFDC")
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
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "1.25rem",
            borderRadius: "16px",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            border: "1px solid #f1f5f9"
          }}>
            <h4 style={{
              color: "#334155",
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "1rem",
              borderBottom: "2px solid #e2e8f0",
              paddingBottom: "0.5rem"
            }}>Payments</h4>
            <div style={{ 
              display: "flex", 
              flexDirection: "column",
              gap: "0.5rem",
              fontSize: "0.95rem"
            }}>
              <span style={{ color: "#64748b" }}>{`Card 28: ${Number(card_28).toFixed(2)}kr.`}</span>
              <span style={{ color: "#64748b" }}>{`Card 43: ${Number(card_43).toFixed(2)}kr.`}</span>
              <span style={{ color: "#64748b" }}>{`Mobile Pay: ${Number(mobile_pay).toFixed(2)}kr.`}</span>
              <span style={{ color: "#64748b" }}>{`Invoices: ${Number(invoices).toFixed(2)}kr.`}</span>
              <span style={{ 
                color: "#0ea5e9",
                fontWeight: "600",
                marginTop: "0.5rem",
                padding: "0.5rem",
                backgroundColor: "#f0f9ff",
                borderRadius: "8px",
                border: "1px solid #e0f2fe"
              }}>{`Product Sales: ${Number(productSales).toFixed(2)}kr.`}</span>
            </div>
          </div>

          <div style={{
            backgroundColor: "#ffffff",
            padding: "1.25rem",
            borderRadius: "16px",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            border: "1px solid #f1f5f9"
          }}>
            <h4 style={{
              color: "#334155",
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "1rem",
              borderBottom: "2px solid #e2e8f0",
              paddingBottom: "0.5rem"
            }}>Cash Details</h4>
            <div style={{ 
              display: "flex", 
              flexDirection: "column",
              gap: "0.5rem",
              fontSize: "0.95rem"
            }}>
              <span style={{ color: "#64748b" }}>{`Notes: ${totalNotes.toFixed(2)}kr.`}</span>
              <span style={{ color: "#64748b" }}>{`Coins: ${totalCoins.toFixed(2)}kr.`}</span>
              <span style={{ 
                color: "#0369a1",
                backgroundColor: "#f0f9ff",
                padding: "0.5rem",
                borderRadius: "8px",
                border: "1px solid #e0f2fe"
              }}>{`Needed: ${neededCash.toFixed(2)}kr.`}</span>
              <span style={{ 
                color: "#0ea5e9",
                fontWeight: "600",
                backgroundColor: "#f0f9ff",
                padding: "0.5rem",
                borderRadius: "8px",
                border: "1px solid #e0f2fe"
              }}>{`Close FDC: ${totalCash.toFixed(2)}kr.`}</span>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: "#ffffff",
          padding: "1.25rem",
          borderRadius: "16px",
          marginBottom: "1.5rem",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          border: "1px solid #f1f5f9"
        }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            marginBottom: "0.75rem",
            color: "#334155"
          }}>
            <span style={{ fontWeight: "500" }}>Cash Difference:</span>
            <span style={{
              color: totalCash + neededCash <= 0 ? "#dc2626" : "#059669",
              fontWeight: "600",
              backgroundColor: totalCash + neededCash <= 0 ? "#fef2f2" : "#f0fdf4",
              padding: "0.25rem 0.75rem",
              borderRadius: "6px"
            }}>{`${cashDiff.toFixed(2)}kr.`}</span>
          </div>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            color: "#334155"
          }}>
            <span style={{ fontWeight: "500" }}>Cash Income:</span>
            <span style={{
              color: incomeCash <= 0 ? "#dc2626" : "#059669",
              fontWeight: "600",
              backgroundColor: incomeCash <= 0 ? "#fef2f2" : "#f0fdf4",
              padding: "0.25rem 0.75rem",
              borderRadius: "6px"
            }}>{`${Number(incomeCash).toFixed(2)}kr.`}</span>
          </div>
        </div>

        {+cashOut && (
          <div style={{
            backgroundColor: "#ffffff",
            padding: "1.25rem",
            borderRadius: "16px",
            marginBottom: "1.5rem",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            border: "1px solid #fee2e2"
          }}>
            <h4 style={{ 
              color: "#dc2626", 
              marginBottom: "0.75rem", 
              fontWeight: "600",
              borderBottom: "2px solid #fecaca",
              paddingBottom: "0.5rem"
            }}>Cash Out Details</h4>
            <p style={{ 
              color: "#ef4444",
              backgroundColor: "#fef2f2",
              padding: "0.5rem",
              borderRadius: "8px",
              marginBottom: "0.5rem"
            }}>{`Amount: ${Number(cashOut).toFixed(2)}kr.`}</p>
            <p style={{ color: "#64748b" }}>{`Reason: ${reason}`}</p>
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
