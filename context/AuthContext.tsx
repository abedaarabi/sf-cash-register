import React, { createContext, useContext } from "react";
// import { getUserDetails } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, getUserDetails } from "../config/firebase";
import { async } from "@firebase/util";

import {
  sendPasswordReset,
  logout,
  logIn,
  signUp,
  signInWithGoogle,
} from "../config/firebase";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState(null) as any;
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName:
            user.displayName || (await getUserDetails(user.uid))?.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        logIn,
        signUp,
        signInWithGoogle,
        sendPasswordReset,
        setUser,
      }}
    >
      {loading ? <p>loading</p> : children}
    </AuthContext.Provider>
  );
};
