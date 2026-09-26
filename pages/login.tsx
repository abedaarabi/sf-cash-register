import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MyField } from "../components/MyField";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Alerts } from "../components/Alerts";
import { AuthShell } from "../components/auth/AuthShell";
import { IconArrowRight, IconLock, IconMail } from "../components/ui/icons";
import { Spinner } from "../components/ui/Loading";
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
  const { user, logIn } = useAuth();
  const router = useRouter();
  const [alert, setAlert] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  React.useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [router, user]);

  if (user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Sorte Firkant - Login</title>
      </Head>

      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            className="fixed inset-x-4 top-4 z-50 sm:left-auto sm:right-6 sm:w-96"
          >
            <Alerts
              severity={alert.type}
              msg={alert.message}
              onClose={() => setAlert(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AuthShell
        title="Welcome back"
        subtitle="Sign in to open and close the register"
        footer={
          <Link href="/rest">
            <a className="font-semibold text-brand-600 transition hover:text-brand-700">
              Forgot your password?
            </a>
          </Link>
        }
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await logIn(values.email, values.password);
              setAlert({
                type: "success",
                message: "Login successful! Redirecting...",
              });
              setTimeout(() => {
                router.push("/dashboard");
              }, 1500);
            } catch (error: any) {
              setAlert({
                type: "error",
                message: error.message || "Login failed. Please try again.",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <Field
                label="Email"
                name="email"
                placeholder="you@sortefirkant.dk"
                type="email"
                startIcon={<IconMail className="h-5 w-5 text-ink-subtle" />}
                component={MyField}
              />
              <Field
                label="Password"
                name="password"
                placeholder="Enter your password"
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
                  ) : null
                }
                trailingIcon={
                  isSubmitting ? null : <IconArrowRight className="h-4 w-4" />
                }
              >
                {isSubmitting ? "Signing in…" : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>
      </AuthShell>
    </>
  );
};

export default Login;
