import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import classes from "./main-header.module.css";
import { admin } from "../../helper/emailAdmin";
import { style } from "@mui/system";

const MainHeader = () => {
  const { user, logout, signInWithGoogle } = useAuth();

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href={user ? "/dashboard" : "/login"}>Sorte Firkant</Link>
      </div>
      <p style={{ color: "white" }}>
        {" "}
        {user ? `Hello ${user?.displayName} 😉 ` : ""}
      </p>
      {admin.includes(user?.email) && (
        <div className={classes.btn}>
          <div>
            <Button
              onClick={() => {
                router.push("/reports");
              }}
            >
              Reports
            </Button>
          </div>

          <div>
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Home
            </Button>
          </div>
        </div>
      )}
      <nav className={classes.navigation}>
        <ul>
          {user ? (
            <Button onClick={handleSignOut}> Log Out</Button>
          ) : (
            <Link href={""}>{user ? "Log out" : "Log in"}</Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
