import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import classes from "./main-header.module.css";
import { admin } from "../../helper/emailAdmin";
import { style } from "@mui/system";
import Image from "next/image";
import React from "react";

const MainHeader = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuth();

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logout();
      router.push("/login");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <header
      className={classes.headerNav}
      id={isOpen ? classes["nav-responsive"] : ""}
    >
      <div className={classes.logo}>
        <Link href={""}>
          <h2>Sorte Firkant</h2>
        </Link>

        <p style={{ color: "white" }}>
          {user ? `Hello ${user?.displayName}` : ""}
        </p>
      </div>

      <nav className={classes.navigation}>
        {user && (
          <h1
            className={classes.responsiveMenu}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "X" : "|||"}
          </h1>
        )}

        <ul className={isOpen ? classes["list-responsive"] : classes.list}>
          {user && (
            <Button
              onClick={() => {
                router.push("/drinks");
                setIsOpen(false);
              }}
            >
              Drinks
            </Button>
          )}
          {admin.includes(user?.email) && (
            <>
              <Button
                onClick={() => {
                  router.push("/reports");
                  setIsOpen(false);
                }}
              >
                Reports
              </Button>
              <Button
                onClick={() => {
                  router.push("/chart");
                  setIsOpen(false);
                }}
              >
                Charts
              </Button>

              <Button
                onClick={() => {
                  router.push("/dashboard");
                  setIsOpen(false);
                }}
              >
                Home
              </Button>
              <Button
                onClick={() => {
                  router.push("/cashout");
                  setIsOpen(false);
                }}
              >
                Cash Out
              </Button>
            </>
          )}

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
