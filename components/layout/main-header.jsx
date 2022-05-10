import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import classes from "./main-header.module.css";
import { admin } from "../../helper/emailAdmin";
import { style } from "@mui/system";
import Image from "next/image";

const MainHeader = () => {
  const { user, logout } = useAuth();

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
    <header className={classes.headerNav}>
      <div className={classes.logo}>
        <Link href={""}>
          <h3 style={{ letterSpacing: "5px" }}>Sorte Firkant</h3>
        </Link>
        {/* <Image height={80} width={80} src={"/img/logo.svg"} /> */}
        {/* <Link href={user ? "/dashboard" : "/login"}>Sorte Firkant</Link> */}
      </div>

      <p style={{ color: "white" }}>
        {user ? `Hello ${user?.displayName} 😉 ` : ""}
      </p>

      {admin.includes(user?.email) && (
        <div className={classes.btnNv}>
          <div style={{ marginRight: "10px" }}>
            <Button
              onClick={() => {
                router.push("/reports");
              }}
            >
              Reports
            </Button>
          </div>
          <div style={{ marginRight: "10px" }}>
            <Button
              onClick={() => {
                router.push("/drinks");
              }}
            >
              Recipes
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
            <Link href={""}>{user ? "Log out" : ""}</Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
