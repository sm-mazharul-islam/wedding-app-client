// import React, { createContext, useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import app from "../firebase/firebase.config";

// // 1. Initialize Context and Auth
// export const AuthContext = createContext();
// const auth = getAuth(app);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const googleProvider = new GoogleAuthProvider();

//   // 2. Registration (Email/Password)
//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   // 3. Login (Email/Password)
//   const signIn = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   // 4. Google Login
//   const signUsingGoogle = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   // 5. Update Profile (Name/Photo)
//   // Logic Fix: Accept the specific user object to avoid state-lag issues
//   const updateUser = (currentUser, userInfo) => {
//     return updateProfile(currentUser, userInfo);
//   };

//   // 6. Logout
//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   // 7. Observer: Watch for Auth state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log("Auth State Changed: ", currentUser);
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const authInfo = {
//     user,
//     loading,
//     createUser,
//     signIn,
//     signUsingGoogle,
//     updateUser,
//     logOut,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;
//!
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import BASE_URL from "../config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  // ইউজার তৈরি করা (এটি Firebase-এ ইউজার তৈরি করে অটোমেটিক লগইন করিয়ে দেয়)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUsingGoogle = () => {
    setLoading(true);
    setIsLoggingIn(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (userInfo) => {
    // এখানে currentUser সরাসরি auth থেকে নেওয়া নিরাপদ
    return updateProfile(auth.currentUser, userInfo);
  };

  const logOut = () => {
    setLoading(true);
    setUser(null); // রিডিরেকশন স্মুথ করার জন্য ইউজার স্টেট নাল করা
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // এডমিন বা ডাটাবেজ থেকে ইউজার ডিলিট করা হলে লগ-আউট লজিক
      if (currentUser?.email && !isLoggingIn) {
        fetch(`${BASE_URL}/users/role/${currentUser.email}`)
          .then((res) => {
            if (res.status === 404) {
              console.warn("User missing in DB. Forced logout triggered.");
              return logOut();
            }
            return res.json();
          })
          .then((data) => {
            // ডাটাবেজ ভেরিফিকেশন শেষে স্টেট আপডেট
            setUser(currentUser);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Session verification failed:", err);
            setUser(currentUser); // এরর হলেও ইউজারকে সেট রাখা
            setLoading(false);
          });
      } else {
        setUser(currentUser);
        setLoading(false);
      }

      // লগইন স্টেট রিসেট টাইমার
      if (isLoggingIn) {
        const timer = setTimeout(() => setIsLoggingIn(false), 5000);
        return () => clearTimeout(timer);
      }
    });
    return () => unsubscribe();
  }, [isLoggingIn]);

  const authInfo = {
    user,
    loading,
    setLoading, // লোডিং স্টেট ম্যানুয়ালি কন্ট্রোল করার জন্য
    createUser,
    signIn,
    signUsingGoogle,
    updateUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
