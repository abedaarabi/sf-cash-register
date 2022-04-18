import { initializeApp } from "firebase/app";

const googleProvider = new GoogleAuthProvider();
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: "https://register-hours-default-rtdb.firebaseio.com/",
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

//signInWithGoogle

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    // const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const userDoc = doc(db, "users", user.uid);

    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case

      await setDoc(userDoc, {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
    }

    console.log(docSnap);

    console.log("Document written with ID: ", user.uid);
  } catch (err) {
    console.error(err);
  }
};

export const signUp = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    console.log(error);
  }
};

export const logIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  // setUser(null);
  return await signOut(auth);
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
  }
};
