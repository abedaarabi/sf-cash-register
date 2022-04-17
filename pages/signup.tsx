import { Button } from "../components/ui/Button";
import { Field, Form, Formik } from "formik";
import React from "react";
import styles from "../styles/Home.module.css";
import { MyField } from "../components/MyField";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

interface Values {
  email: string;
  password: string;
  displayName: string;
}
interface Props {
  signUp: (value: Values) => void;
}

const SignUp: React.FC<Props> = () => {
  const { user, signUp } = useAuth();
  const router = useRouter();
  console.log(user);

  React.useEffect(() => {
    user && router.push("/dashboard");
  }, [router, user]);
  return (
    <div className={styles.container}>
      <Formik
        initialValues={{ email: "", password: "", displayName: "" }}
        onSubmit={async (value) => {
          try {
            await signUp(value.email, value.password, value.displayName);
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
            <div>
              <Field
                label="name"
                name="displayName"
                placeholder="name"
                variant="standard"
                color="success"
                component={MyField}
              />
            </div>

            <Button type="submit">Sign Up</Button>
          </Form>
        )}
      </Formik>
      <div>
        <Link href={"/login"}> Log In</Link>
      </div>
    </div>
  );
};

export default SignUp;
