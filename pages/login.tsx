// import { Button, Icon } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MyField } from "../components/MyField";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";
import { Button } from "../components/ui/Button";
import { Alerts } from "../components/Alerts";
import Head from "next/head";
const Login: React.FC = () => {
  const { user, logIn, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [alert, setAlert] = React.useState(null) as any;
  const [hide, setHide] = React.useState(false) as any;

  const loginWithGoogle = async () => {
    await signInWithGoogle();
    router.push("/dashboard");
  };

  React.useEffect(() => {
    user && router.push("/dashboard");
  }, [router, user]);

  React.useEffect(() => {
    const time = setTimeout(() => {
      setHide(false);
    }, 3000);
    return () => clearTimeout(time);
  }, [alert, hide]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        {hide && (
          <Alerts
            msg={alert?.code ? alert?.code : "Login Success"}
            severity={alert?.code ? "error" : "success"}
          />
        )}
      </div>
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (value) => {
            try {
              const loginResult = await logIn(value.email, value.password);
              setAlert(loginResult);
              setHide(true);
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
              <div>
                <Field
                  label="password"
                  name="password"
                  placeholder="password"
                  variant="standard"
                  color="success"
                  type="password"
                  component={MyField}
                />
              </div>

              <Button type="submit">Log In</Button>
            </Form>
          )}
        </Formik>
        {/* <Button onClick={loginWithGoogle}> Login with Google</Button> */}
      </div>

      <Link href={"/rest"}>Reset Password</Link>

      <div>
        <p>
          Do not have an account? <Link href={"/signup"}>Register</Link> now.
        </p>
      </div>
    </div>
  );
};

export default Login;
