import React from "react";
// import { Button, Icon } from "@mui/material";
import { Button } from "../components/ui/Button";
import { Field, Form, Formik } from "formik";

import { MyField } from "../components/MyField";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";
import {
  countCoins,
  countNote,
  formikvalues,
  payments,
  sales,
} from "../helper/inputshelper";
import { route } from "next/dist/server/router";
import { useRouter } from "next/router";

export const RegisterHours = () => {
  const { user } = useAuth();
  const router = useRouter();
  function addCommentHandler(inputsValue: any) {
    fetch("/api/register-hours/" + user.uid, {
      method: "POST",
      body: JSON.stringify(inputsValue),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
                        defaultValue={0}
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
                        defaultValue={0}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ paddingLeft: "5px" }}>
                  <p>Count Coins</p>
                  {countCoins.map(({ label, name, placeholder }: any) => (
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
                        defaultValue={0}
                      />
                    </div>
                  ))}
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
                        defaultValue={0}
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
