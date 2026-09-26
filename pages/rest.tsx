import { Field, Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MyField } from "../components/MyField";
import { AuthShell } from "../components/auth/AuthShell";
import { Button } from "../components/ui/Button";
import { IconMail } from "../components/ui/icons";
import { Spinner } from "../components/ui/Loading";
import { useAuth } from "../context/AuthContext";

const Reset = () => {
  const { sendPasswordReset } = useAuth();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sorte Firkant - Reset Password</title>
      </Head>

      <AuthShell
        badge="Account recovery"
        title="Reset password"
        subtitle="We'll email you a secure reset link"
        footer={
          <Link href="/login">
            <a className="font-semibold text-brand-600 transition hover:text-brand-700">
              Back to login page
            </a>
          </Link>
        }
      >
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
              >
                {isSubmitting ? "Sending…" : "Send reset link"}
              </Button>
            </Form>
          )}
        </Formik>
      </AuthShell>
    </>
  );
};

export default Reset;
