import { Button } from "../components/ui/Button";
import { Field, Form, Formik } from "formik";
import React from "react";
import { MyField } from "../components/MyField";
import { Alerts } from "../components/Alerts";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Head>
        <title>Sorte Firkant - Add User</title>
      </Head>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Add New User</h1>
          <p className="text-gray-600 mb-6">Create an account for a team member</p>
        </div>

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
          {() => (
            <Form className="space-y-6">
              {successMsg && (
                <div className="flex justify-center">
                  <Alerts severity="success" msg={successMsg} />
                </div>
              )}
              {errorMsg && (
                <div className="flex justify-center">
                  <Alerts severity="error" msg={errorMsg} />
                </div>
              )}
              <div>
                <Field
                  label="Name"
                  name="displayName"
                  placeholder="Enter user's name"
                  variant="standard"
                  color="success"
                  component={MyField}
                />
              </div>
              <div>
                <Field
                  label="Email"
                  name="email"
                  placeholder="Enter user's email"
                  variant="standard"
                  color="success"
                  type="email"
                  component={MyField}
                />
              </div>
              <div>
                <Field
                  label="Password"
                  name="password"
                  placeholder="Set a password"
                  variant="standard"
                  color="success"
                  type="password"
                  component={MyField}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
                >
                  Add User
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
