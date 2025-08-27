import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import classes from "./main-header.module.css";
import { admin } from "../../helper/emailAdmin";
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
    <>
      <header className={classes.header}>
        <div className={classes.headerContent}>
          <div className={classes.logo}>
            <Link href="/" legacyBehavior passHref>
              <a>
                <h2>Sorte Firkant</h2>
              </a>
            </Link>
            {user && (
              <p className={classes.welcomeText}>
                Welcome, {user?.displayName}
              </p>
            )}
          </div>

          {user && (
            <button
              className={`${classes.hamburger} ${isOpen ? classes.active : ""}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span className={classes.bar}></span>
              <span className={classes.bar}></span>
              <span className={classes.bar}></span>
            </button>
          )}

          <nav className={`${classes.nav} ${isOpen ? classes.active : ''}`}>
            <ul className={classes.navList}>
              {user && (
                <li>
                  <Button
                    onClick={() => {
                      router.push("/drinks");
                      setIsOpen(false);
                    }}
                  >
                    Drinks
                  </Button>
                </li>
              )}
              {admin.includes(user?.email) && (
                <>
                  <li>
                    <Button
                      onClick={() => {
                        router.push("/reports");
                        setIsOpen(false);
                      }}
                    >
                      Reports
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => {
                        router.push("/signup");
                        setIsOpen(false);
                      }}
                    >
                      Add User
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => {
                        router.push("/chart");
                        setIsOpen(false);
                      }}
                    >
                      Charts
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => {
                        router.push("/dashboard");
                        setIsOpen(false);
                      }}
                    >
                      Home
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => {
                        router.push("/cashout");
                        setIsOpen(false);
                      }}
                    >
                      Cash Out
                    </Button>
                  </li>
                </>
              )}
              {user && (
                <li>
                  <Button onClick={handleSignOut} className={classes.logoutBtn}>
                    Log Out
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <div className={classes.headerSpacing}></div>
    </>
  );
};

export default MainHeader;
