import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
import { Layout } from "../components/layout/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const noAuth = ["/", "/login", "/rest", "/drinks"];
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#0B1120" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthContextProvider>
            <Layout>
              {noAuth.includes(router.pathname) ? (
                <Component {...pageProps} />
              ) : (
                <ProtectedRoutes>
                  <Component {...pageProps} />
                </ProtectedRoutes>
              )}
            </Layout>
          </AuthContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
