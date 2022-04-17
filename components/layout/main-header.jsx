import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import classes from "./main-header.module.css";

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
      <nav className={classes.navigation}>
        <ul>
          {user ? (
            <Button onClick={handleSignOut}> Log Out</Button>
          ) : (
            <Link href={""}>{user ? "Log out" : "Log in"}</Link>
          )}
          <p style={{ color: "gray" }}> {user ? `Hello ${user.email}` : ""}</p>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
