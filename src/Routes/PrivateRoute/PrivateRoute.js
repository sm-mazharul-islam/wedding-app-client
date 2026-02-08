// import React, { useContext } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthProvider';

// const PrivateRoute = ({children}) => {
//     const {user, loading} = useContext(AuthContext);
//     const location = useLocation();

//     if(loading){
//         return <progress className="progress w-56  justify-center items-center"></progress>
//     }

//     if(user){
//         return children;
//     }

//     return <Navigate to="/login" state={{from: location}} replace></Navigate> ;
// };

// export default PrivateRoute;

//!
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Loader2 } from "lucide-react"; // আইকন ব্যবহারের জন্য
import { AuthContext } from "../../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F6]">
        <div className="relative flex items-center justify-center">
          {/* আউটার স্পিনার */}
          <div className="w-16 h-16 border-4 border-[#1A1D1F]/5 border-t-[#1A1D1F] rounded-full animate-spin"></div>
          {/* ইনার আইকন */}
          <Loader2
            className="absolute text-[#1A1D1F] animate-pulse"
            size={24}
          />
        </div>
        <p className="mt-4 text-[#1A1D1F] font-black text-[10px] uppercase tracking-[3px] animate-pulse">
          Authenticating...
        </p>
      </div>
    );
  }

  if (user) {
    return children;
  }

  // লগইন না থাকলে redirect করুন এবং বর্তমান location মনে রাখুন
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
