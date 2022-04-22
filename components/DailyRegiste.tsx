import React from "react";
// import { Button, Icon } from "@mui/material";
import { Button } from "./ui/Button";
import { Field, Form, Formik } from "formik";

import { BasicSelect, DateINput, MyField } from "./MyField";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";
import {
  countCoins,
  countNote,
  payments,
  sales,
  Statevalues,
} from "../helper/inputshelper";

import { useRouter } from "next/router";
import { TextField } from "@mui/material";

export const RegisterHours = ({ id }: any) => {
  const { user } = useAuth();
  const router = useRouter();

  const [dailyUpdate, setDailyUpdate] = React.useState(null) as any;

  const [loading, setLoading] = React.useState(true);
  const [fdc, setFdc] = React.useState(null) as any;

  React.useEffect(() => {
    fetch("/api/register-hours/" + user.uid)
      .then((res) => res.json())
      .then(({ response }) => {
        setFdc(response[response.length - 1]);
        const byId = response.find((item: any) => item._id === id);

        setDailyUpdate(byId);
        setLoading(false);
      });
  }, [user]);

  function addCommentHandler(inputsValue: any) {
    fetch("/api/register-hours/" + user.uid, {
      method: "POST",
      body: JSON.stringify({
        ...inputsValue,
        id,
        closedBy: user.displayName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  if (loading) {
    return <h2 className={styles.container}>Loading...</h2>;
  }

  const noteTotal = getTotal(fdc?.countNote);
  const coinsTotal = getTotal(fdc?.countCoins);
  const opening = noteTotal + coinsTotal - (fdc?.cashOut.amount || 0);

  let formikvalues;

  if (id) {
    const { countCoins: coins } = dailyUpdate;
    const { comments, closingDate, cashOut } = dailyUpdate as any;
    const { countNote: note } = dailyUpdate;
    const { productSales, other } = dailyUpdate.sales;
    const { card28, card43, mobilePay, invoices } = dailyUpdate.payments;

    formikvalues = {
      card28: card28,
      card43: card43,
      mobilePay: mobilePay,
      invoices: invoices,
      "1000s": note["1000s"] / 1000,
      "500s": note["500s"] / 500,
      "200s": note["200s"] / 200,
      "100s": note["100s"] / 100,
      "50s": note["50s"] / 50,
      "20s": coins["20s"] / 20,
      "10s": coins["10s"] / 10,
      "5s": coins["5s"] / 5,
      "2s": coins["2s"] / 2,
      "1s": coins["1s"] / 1,
      half: coins.half / 0.5,
      comments: comments,
      productSales: productSales,
      other: other,
      closingDate: closingDate,
      cashOut: cashOut?.amount,
      reason: cashOut?.reason,
    };
  } else {
    formikvalues = Statevalues;
  }

  /*
  
  color: rgb(0, 109, 119);
    display: flex;
 
    background-color: blue;
    width: 300px;
    margin-top: 10px;
    height: 40px;
  */

  return (
    <div className={styles.container}>
      <div className={styles.zoom}>
        <h4 style={{ margin: "auto", color: "white" }}>
          Opening FDC: {opening && opening.toFixed(2)}kr.
        </h4>
      </div>
      <div>
        <Formik
          initialValues={formikvalues}
          onSubmit={(value) => {
            try {
              if (value.card28 <= 0 || value.productSales === 0) {
                alert("fill the inputs");
              } else {
                addCommentHandler(value);
                router.push("/dataresult");
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {() => (
            <Form>
              <div style={{ display: "flex" }}>
                <div style={{ paddingLeft: "5px" }}>
                  <p>Sales</p>
                  {sales.map(({ label, name, placeholder }: any) => (
                    <div key={name.toString()}>
                      <Field
                        label={label}
                        name={name}
                        placeholder={placeholder}
                        variant="outlined"
                        color="success"
                        type="number"
                        width={"8rem"}
                        marginBottom={"1rem"}
                        component={MyField}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ paddingLeft: "5px" }}>
                  <p>Payments</p>
                  {payments.map(({ label, name, placeholder }: any) => (
                    <div key={name.toString()}>
                      <Field
                        label={label}
                        name={name}
                        placeholder={placeholder}
                        variant="outlined"
                        color="success"
                        type="number"
                        width={"8rem"}
                        marginBottom={"1rem"}
                        component={MyField}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ paddingLeft: "5px" }}>
                  <p>Count Coins</p>

                  {countCoins.map(({ label, name, placeholder }: any) => {
                    return (
                      <div key={name.toString()}>
                        <Field
                          label={label}
                          name={name}
                          placeholder={placeholder}
                          variant="outlined"
                          color="success"
                          type="number"
                          width={"8rem"}
                          marginBottom={"1rem"}
                          component={MyField}
                        />
                      </div>
                    );
                  })}
                </div>
                <div style={{ paddingLeft: "5px" }}>
                  <p>Count Note</p>
                  {countNote.map(({ label, name, placeholder }: any) => (
                    <div key={name.toString()}>
                      <Field
                        label={label}
                        name={name}
                        placeholder={placeholder}
                        variant="outlined"
                        color="success"
                        type="number"
                        width={"8rem"}
                        marginBottom={"1rem"}
                        component={MyField}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                }}
              >
                <div style={{ marginRight: "15px" }}>
                  <Field
                    name="cashOut"
                    placeholder="Cash out"
                    label="Cash out"
                    variant="outlined"
                    color="error"
                    type="number"
                    width={"8rem"}
                    marginBottom={"1rem"}
                    component={MyField}
                  />
                </div>
                <div>
                  <Field
                    name="reason"
                    placeholder="Reason"
                    label="Reason"
                    variant="outlined"
                    color="secondary"
                    type="number"
                    width={"8rem"}
                    // marginBottom={"1rem"}
                    component={BasicSelect}
                  />
                </div>
                <div style={{ marginLeft: "15px" }}>
                  <Field
                    placeholder="Date"
                    name="closingDate"
                    label="date"
                    color="success"
                    updateDone
                    type="date"
                    component={DateINput}
                    required={true}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Field
                  name="comments"
                  placeholder="comments"
                  label="comments"
                  multiline
                  rows={5}
                  variant="outlined"
                  color="success"
                  type="textArea"
                  width={"33rem"}
                  marginBottom={"1rem"}
                  component={MyField}
                  required={false}
                />
              </div>
              <Button type="submit">Close Register</Button>
            </Form>
          )}
        </Formik>
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
