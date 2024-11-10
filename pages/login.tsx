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
    <div className={styles.loginContainer}>
      <Head>
        <title>Sorte Firkant - Login</title>
      </Head>

      <div className={styles.loginWrapper}>
        <div className={styles.loginContent}>
          <h1 className={styles.loginTitle}>Welcome Back</h1>
          <p className={styles.loginSubtitle}>Sign in to continue</p>

          {hide && (
            <div className={styles.alertWrapper}>
              <Alerts
                msg={alert?.code ? alert?.code : "Login Success"}
                severity={alert?.code ? "error" : "success"}
              />
            </div>
          )}

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
              <Form className={styles.loginForm}>
                <div className={styles.formField}>
                  <Field
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    variant="standard"
                    color="success"
                    type="email"
                    component={MyField}
                  />
                </div>
                <div className={styles.formField}>
                  <Field
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    variant="standard"
                    color="success"
                    type="password"
                    component={MyField}
                  />
                </div>
                <div className={styles.buttonWrapper}>
                  <Button type="submit" className={styles.loginButton}>
                    Sign In
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          <div className={styles.loginFooter}>
            <Link href="/rest">Forgot Password?</Link>
            <p className={styles.registerText}>
              Don't have an account? <Link href="/signup">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
