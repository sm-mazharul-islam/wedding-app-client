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

// export const AuthContext = createContext();
// const auth = getAuth(app);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const googleProvider = new GoogleAuthProvider();

//   // This is for sign in with Google
//   const signUsingGoogle = (location, navigate) => {
//     setLoading(true);
//     signInWithPopup(auth, googleProvider)
//       .then((result) => {
//         const user = result.user;
//         setUser(user);
//       })
//       .finally(() => setLoading(false));
//   };

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const signIn = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const updateUser = (userInfo) => {
//     return updateProfile(user, userInfo);
//   };

//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log("user observing");
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, [auth]);
//   if (loading) {
//     return <p>Loading...</p>; // Display a loading message while checking auth state
//   }

//   const authInfo = {
//     createUser,
//     signIn,
//     updateUser,
//     logOut,
//     user,
//     loading,
//     signUsingGoogle,
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

// 1. Initialize Context and Auth
export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // 2. Registration (Email/Password)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 3. Login (Email/Password)
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 4. Google Login
  const signUsingGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 5. Update Profile (Name/Photo)
  // Logic Fix: Accept the specific user object to avoid state-lag issues
  const updateUser = (currentUser, userInfo) => {
    return updateProfile(currentUser, userInfo);
  };

  // 6. Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // 7. Observer: Watch for Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth State Changed: ", currentUser);
      setUser(currentUser);
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
