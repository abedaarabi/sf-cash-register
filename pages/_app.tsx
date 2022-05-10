import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
import { Layout } from "../components/layout/layout";

function MyApp({ Component, pageProps }: AppProps) {
  const noAuth = ["/", "/login", "/signup", "/rest", "/drinks"];
  const router = useRouter();
  return (
    <>
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
    </>
  );
}

export default MyApp;
