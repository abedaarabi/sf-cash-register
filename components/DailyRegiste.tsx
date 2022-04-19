import React from "react";
// import { Button, Icon } from "@mui/material";
import { Button } from "./ui/Button";
import { Field, Form, Formik } from "formik";

import { MyField } from "./MyField";
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

export const RegisterHours = ({ id }: any) => {
  const { user } = useAuth();
  const router = useRouter();

  const [dailyUpdate, setDailyUpdate] = React.useState(null) as any;

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    //TODO:add a new endpoint with id instead of query the whole array from the database!
    fetch("/api/register-hours/" + user.uid)
      .then((res) => res.json())
      .then(({ response }) => {
        const byId = response.find((item: any) => item._id === id);
        console.log(byId);

        setDailyUpdate(byId);
        setLoading(false);
      });
  }, [user]);

  function addCommentHandler(inputsValue: any) {
    fetch("/api/register-hours/" + user.uid, {
      method: "POST",
      body: JSON.stringify({ ...inputsValue, id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  if (loading) {
    return <h2 className={styles.container}>Loading...</h2>;
  }

  let formikvalues;

  if (id) {
    const { countCoins: conis } = dailyUpdate;
    const { comments } = dailyUpdate;
    const { countNote: note } = dailyUpdate;
    const { productSales, other } = dailyUpdate.sales;
    const { card28, card43, mobilePay, invoices } = dailyUpdate.payments;
    formikvalues = {
      card28: card28 || 0,
      card43: card43 || 0,
      mobilePay: mobilePay || 0,
      invoices: invoices || 0,
      "1000s": note["1000s"] || 0,
      "500s": note["500s"] || 0,
      "200s": note["200s"] || 0,
      "100s": note["100s"] || 0,
      "50s": note["50s"] || 0,
      "20s": conis["20s"] || 0,
      "10s": conis["10s"] || 0,
      "5s": conis["5s"] || 0,
      "2s": conis["2s"] || 0,
      "1s": conis["1s"] || 0,
      comments: comments || "",
      productSales: productSales || 0,
      other: other || 0,
    };
  } else {
    formikvalues = Statevalues;
  }

  return (
    <div className={styles.container}>
      <div>
        <Formik
          initialValues={formikvalues}
          onSubmit={(value) => {
            try {
              if (
                value.card28 === 0 ||
                value.card43 === 0 ||
                value.productSales === 0
              ) {
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
