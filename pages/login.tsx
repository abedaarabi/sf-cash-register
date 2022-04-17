// import { Button, Icon } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MyField } from "../components/MyField";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";
import { Button } from "../components/ui/Button";
const Login: React.FC = () => {
  const { user, logIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const loginWithGoogle = async () => {
    await signInWithGoogle();
    router.push("/dashboard");
  };

  React.useEffect(() => {
    user && router.push("/dashboard");
  }, [router, user]);

  return (
    <div className={styles.container}>
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (value) => {
            try {
              await logIn(value.email, value.password);
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
        <Button onClick={loginWithGoogle}> Login with Google</Button>
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
