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
import { CircularProgress, TextField } from "@mui/material";

export const RegisterHours = ({ id }: any) => {
  const { user } = useAuth();
  const router = useRouter();

  const [dailyUpdate, setDailyUpdate] = React.useState(null) as any;

  const [loading, setLoading] = React.useState(true);
  const [fdc, setFdc] = React.useState(null) as any;

  React.useEffect(() => {
    fetch("/api/dailyreports/report/")
      .then((res) => res.json())
      .then(({ response }) => {
        setFdc(response[response.length - 1]);
        const byId = response.find((item: any) => item.id === +id);

        setDailyUpdate(byId);
        setLoading(false);
      });
  }, [user]);

  async function addCommentHandlerPrisma(inputsValue: any) {
    await fetch("/api/dailyreports/report/", {
      method: "POST",
      body: JSON.stringify({
        ...inputsValue,
        id: +id,
        displayName: user.displayName,
        employeeId: user.uid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  if (loading) {
    return (
      <h2 className={styles.container}>
        <CircularProgress />
      </h2>
    );
  }

  const Coins = {
    twenty_kr: fdc?.twenty_kr,
    ten_kr: fdc?.ten_kr,
    five_kr: fdc?.five_kr,
    two_kr: fdc?.two_kr,
    one_kr: fdc?.one_kr,
    half_kr: fdc?.half_kr,
  };

  const Note = {
    one_thousand_kr: fdc?.one_thousand_kr,
    five_hundred_kr: fdc?.five_hundred_kr,
    two_hundred_kr: fdc?.two_hundred_kr,
    one_hundred_kr: fdc?.one_hundred_kr,
    fifty_kr: fdc?.fifty_kr,
  };

  const noteTotal = getTotal(Note);
  const coinsTotal = getTotal(Coins);
  const opening = noteTotal + coinsTotal - (fdc?.cashOut.amount || 0);

  let formikvalues;

  if (id) {
    console.log(dailyUpdate);

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
    } = dailyUpdate;

    formikvalues = {
      card28: card_28,
      card43: card_43,
      mobilePay: mobile_pay,
      invoices: invoices,
      "1000s": one_thousand_kr / 1000,
      "500s": five_hundred_kr / 500,
      "200s": two_hundred_kr / 200,
      "100s": one_hundred_kr / 100,
      "50s": fifty_kr / 50,
      "20s": twenty_kr / 20,
      "10s": ten_kr / 10,
      "5s": five_kr / 5,
      "2s": two_kr / 2,
      "1s": one_kr / 1,
      half: half_kr / 0.5,
      comments: comments,
      productSales: productSales,
      other: other,
      closingDate: closingDate,
      cashOut: cashOut,
      reason: reason,
    };
  } else {
    formikvalues = Statevalues;
  }

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
          onSubmit={async (value) => {
            try {
              if (value.productSales === 0) {
                alert("fill the inputs");
              } else {
                await addCommentHandlerPrisma(value);

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
    const element = +obj[key];
    total += element;
  }
  return total;
};
