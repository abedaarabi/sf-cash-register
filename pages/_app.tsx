import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
import { Layout } from "../components/layout/layout";
import { QueryClient, QueryClientProvider } from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";
function MyApp({ Component, pageProps }: AppProps) {
  const noAuth = ["/", "/login", "/signup", "/rest", "/drinks"];
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Layout>
            {noAuth.includes(router.pathname) ? (
              <>
                <Component {...pageProps} />
              </>
            ) : (
              <>
                <ProtectedRoutes>
                  <Component {...pageProps} />
                </ProtectedRoutes>
              </>
            )}
          </Layout>
        </AuthContextProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
