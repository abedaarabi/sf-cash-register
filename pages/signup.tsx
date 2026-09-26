import { Button } from "../components/ui/Button";
import { Field, Form, Formik } from "formik";
import React from "react";
import { MyField } from "../components/MyField";
import { Alerts } from "../components/Alerts";
import { AuthShell } from "../components/auth/AuthShell";
import {
  IconLock,
  IconMail,
  IconUser,
  IconUserPlus,
} from "../components/ui/icons";
import { Spinner } from "../components/ui/Loading";
import { useAuth } from "../context/AuthContext";
import Head from "next/head";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  displayName: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const [successMsg, setSuccessMsg] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  return (
    <>
      <Head>
        <title>Sorte Firkant - Add User</title>
      </Head>

      <AuthShell
        badge="Team management"
        title="Add new user"
        subtitle="Create an account for a team member"
      >
        <Formik
          initialValues={{ email: "", password: "", displayName: "" }}
          validationSchema={SignUpSchema}
          onSubmit={async (value, { resetForm }) => {
            try {
              await signUp(value.email, value.password, value.displayName);
              setErrorMsg("");
              setSuccessMsg("User created successfully.");
              resetForm();
            } catch (error) {
              console.log(error);
              setSuccessMsg("");
              setErrorMsg("Failed to create user. Try again.");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {successMsg && (
                <Alerts
                  severity="success"
                  msg={successMsg}
                  onClose={() => setSuccessMsg("")}
                />
              )}
              {errorMsg && (
                <Alerts
                  severity="error"
                  msg={errorMsg}
                  onClose={() => setErrorMsg("")}
                />
              )}
              <Field
                label="Name"
                name="displayName"
                placeholder="Enter user's name"
                startIcon={<IconUser className="h-5 w-5 text-ink-subtle" />}
                component={MyField}
              />
              <Field
                label="Email"
                name="email"
                placeholder="Enter user's email"
                type="email"
                startIcon={<IconMail className="h-5 w-5 text-ink-subtle" />}
                component={MyField}
              />
              <Field
                label="Password"
                name="password"
                placeholder="Set a password"
                type="password"
                startIcon={<IconLock className="h-5 w-5 text-ink-subtle" />}
                component={MyField}
              />
              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                icon={
                  isSubmitting ? (
                    <Spinner className="h-4 w-4 border-white/40 border-t-white" />
                  ) : (
                    <IconUserPlus className="h-4 w-4" />
                  )
                }
              >
                {isSubmitting ? "Creating…" : "Add User"}
              </Button>
            </Form>
          )}
        </Formik>
      </AuthShell>
    </>
  );
};

export default SignUp;
