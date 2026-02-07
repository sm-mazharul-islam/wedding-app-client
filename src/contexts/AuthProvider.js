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

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

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
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (currentUser, userInfo) => {
    return updateProfile(currentUser, userInfo);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // --- নতুন লজিক: ডিলিট হওয়া ইউজারকে অটো লগ-আউট করা ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        // ব্যাকএন্ড থেকে ইউজারের বর্তমান অবস্থা চেক করা
        fetch(
          `https://wedding-app-server-eight.vercel.app/users/role/${currentUser.email}`,
        )
          .then((res) => res.json())
          .then((data) => {
            // যদি ডাটাবেজে ইউজার না থাকে (৪0৪ এরর বা নাল রেসপন্স)
            if (!data || data.message === "User not found" || data.error) {
              console.log("User deleted by admin. Logging out...");
              logOut(); // ফায়ারবেস থেকে সেশন আউট করে দিবে
            }
          })
          .catch((err) => console.error("Auto-logout check failed:", err));
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
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
