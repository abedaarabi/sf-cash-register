import { Button } from "../components/ui/Button";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MyField } from "../components/MyField";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";
const Reset = () => {
  const { sendPasswordReset } = useAuth();

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (value) => {
            try {
              await sendPasswordReset(value.email);
              router.push("/login");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {() => (
            <Form>
              <div>
                <Field
                  label="email"
                  name="email"
                  placeholder="email"
                  variant="standard"
                  color="success"
                  type="email"
                  component={MyField}
                />
              </div>

              <Button type="submit">Rest Password</Button>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        {/* <Link href={"/login"}> Login</Link> */}
        <Button href={"/login"} type="submit">
          Back to login page
        </Button>
      </div>
    </div>
  );
};

export default Reset;
