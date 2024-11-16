import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MyField } from "../components/MyField";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Alerts } from "../components/Alerts";
import Head from "next/head";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const { user, logIn, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [alert, setAlert] = React.useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const loginWithGoogle = async () => {
    await signInWithGoogle();
    router.push("/dashboard");
  };

  React.useEffect(() => {
    user && router.push("/dashboard");
  }, [router, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Head>
        <title>Sorte Firkant - Login</title>
      </Head>

      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 right-4 z-50"
          >
            <div
              className={`rounded-lg p-4 shadow-lg ${
                alert.type === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {alert.type === 'success' ? (
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                )}
                <p
                  className={`text-sm font-medium ${
                    alert.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {alert.message}
                </p>
                <button
                  onClick={() => setAlert(null)}
                  className={`ml-auto text-${
                    alert.type === 'success' ? 'green' : 'red'
                  }-700 hover:opacity-70`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mb-6">Sign in to continue</p>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await logIn(values.email, values.password);
              setAlert({
                type: 'success',
                message: 'Login successful! Redirecting...'
              });
              setTimeout(() => {
                router.push("/dashboard");
              }, 1500);
            } catch (error: any) {
              setAlert({
                type: 'error',
                message: error.message || 'Login failed. Please try again.'
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
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
              <div>
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
              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center">
          <Link href="/rest">
            <span className="text-blue-600 hover:text-blue-500">
              Forgot Password?
            </span>
          </Link>
          <p className="text-gray-600 mt-2">
            Don&apos;t have an account?{" "}
            <Link href="/signup">
              <span className="text-blue-600 hover:text-blue-500 font-semibold">
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
