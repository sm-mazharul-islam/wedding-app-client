// import React, { useContext, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthProvider";

// const Login = () => {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();
//   const { signIn, signUsingGoogle } = useContext(AuthContext);
//   const [loginError, setLoginError] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();

//   const from = location.state?.from?.pathname || "/";

//   // Helper to sync Firebase user with MongoDB
//   const saveUserToDb = (user) => {
//     const currentUser = {
//       email: user.email,
//       name: user.displayName || user.email.split("@")[0],
//       role: "user", // Default role for all new logins
//     };

//     fetch("http://localhost:5000/users", {
//       method: "POST", // POST handles the upsert logic
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(currentUser),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         navigate(from, { replace: true });
//       });
//   };

//   const handleLogin = (data) => {
//     setLoginError("");
//     signIn(data.email, data.password)
//       .then(() => {
//         navigate(from, { replace: true });
//       })
//       .catch((error) => setLoginError(error.message));
//   };

//   const handleGoogleLogin = () => {
//     signUsingGoogle()
//       .then((result) => {
//         saveUserToDb(result.user); //
//       })
//       .catch((error) => setLoginError(error.message));
//   };

//   return (
//     <div className="h-[500px] flex justify-center items-center card w-96 bg-base-100 shadow-xl mx-auto m-11">
//       <div className="w-96 p-7">
//         <h2 className="text-xl text-center font-bold">Login</h2>
//         <form onSubmit={handleSubmit(handleLogin)}>
//           <div className="form-control w-full">
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               type="text"
//               {...register("email", { required: "Email is required" })}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div className="form-control w-full">
//             <label className="label">
//               <span className="label-text">Password</span>
//             </label>
//             <input
//               type="password"
//               {...register("password", { required: "Password is required" })}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <input
//             className="btn btn-accent w-full mt-4"
//             value="Login"
//             type="submit"
//           />
//           {loginError && (
//             <p className="text-red-600 text-center mt-2">{loginError}</p>
//           )}
//         </form>
//         <p className="mt-2 text-center text-sm">
//           New here?{" "}
//           <Link className="text-secondary" to="/signup">
//             Create account
//           </Link>
//         </p>
//         <div className="divider">OR</div>
//         <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
//           CONTINUE WITH GOOGLE
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
//!

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Mail, Lock, ArrowRight, Chrome, Loader2 } from "lucide-react";
import { AuthContext } from "../../contexts/AuthProvider";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { signIn, signUsingGoogle } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";

  // ডাটাবেজ সিঙ্ক বা চেক ফাংশন
  const checkUserInDb = (user) => {
    const currentUser = {
      email: user.email,
      name: user.displayName || user.email.split("@")[0],
      image: user.photoURL,
      role: "user",
    };

    // লগইনের সময় ডাটাবেজে ইউজার ইনফো আপডেট বা চেক করা
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(currentUser),
    })
      .then((res) => res.json())
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          customClass: { popup: "rounded-2xl" },
        });
        Toast.fire({
          icon: "success",
          title: "Welcome back!",
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("DB Sync Error:", err);
      });
  };

  const handleLogin = (data) => {
    setLoginError("");
    setIsLogging(true);

    signIn(data.email, data.password)
      .then((result) => {
        checkUserInDb(result.user);
      })
      .catch((error) => {
        setLoginError("Invalid email or password. Please try again.");
      })
      .finally(() => setIsLogging(false));
  };

  const handleGoogleLogin = () => {
    setLoginError("");
    signUsingGoogle()
      .then((result) => {
        checkUserInDb(result.user);
      })
      .catch((error) => setLoginError(error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F6] p-4 md:p-8">
      <div className="w-full max-w-[450px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[40px] overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-700">
        {/* Header Section */}
        <div className="bg-[#1A1D1F] p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <h2 className="text-4xl font-black tracking-tighter mb-2 italic">
            Hello Again!
          </h2>
          <p className="text-gray-400 text-sm font-medium">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="p-8 md:p-10 bg-white">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email Field */}
            <div className="form-control group">
              <label className="label py-1">
                <span className="label-text font-bold text-[11px] uppercase tracking-[2px] text-gray-400 group-focus-within:text-[#1A1D1F] transition-colors">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1A1D1F] transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="input w-full pl-12 bg-[#FAF7F6] border-none rounded-2xl focus:ring-2 focus:ring-[#1A1D1F]/5 text-sm h-14 font-medium placeholder:text-gray-300"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-2 ml-1 font-bold italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control group">
              <label className="label py-1 flex justify-between items-center">
                <span className="label-text font-bold text-[11px] uppercase tracking-[2px] text-gray-400 group-focus-within:text-[#1A1D1F] transition-colors">
                  Password
                </span>
                <Link className="text-[10px] font-black text-[#1A1D1F] hover:underline underline-offset-2">
                  Forgot Password?
                </Link>
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1A1D1F] transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="input w-full pl-12 bg-[#FAF7F6] border-none rounded-2xl focus:ring-2 focus:ring-[#1A1D1F]/5 text-sm h-14 font-medium placeholder:text-gray-300"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-[10px] mt-2 ml-1 font-bold italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            {loginError && (
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <p className="text-red-600 text-[11px] font-bold text-center italic">
                  {loginError}
                </p>
              </div>
            )}

            <button
              disabled={isLogging}
              className="btn w-full bg-[#1A1D1F] hover:bg-[#2A2E31] text-white rounded-2xl h-14 border-none shadow-xl shadow-[#1A1D1F]/10 flex items-center justify-center gap-3 group transition-all active:scale-95 disabled:bg-gray-400"
            >
              {isLogging ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span className="font-bold tracking-tight">
                    Login to Dashboard
                  </span>
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 font-medium">
              Don't have an account?{" "}
              <Link
                className="text-[#1A1D1F] font-black hover:underline underline-offset-4"
                to="/signup"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <div className="divider my-10 text-[10px] font-black uppercase tracking-[3px] text-gray-300">
            Quick Access
          </div>

          <button
            onClick={handleGoogleLogin}
            className="btn w-full bg-white hover:bg-[#FAF7F6] border-2 border-[#FAF7F6] text-[#1A1D1F] rounded-2xl h-14 shadow-sm flex items-center justify-center gap-4 transition-all duration-300 active:scale-95"
          >
            <Chrome size={20} className="text-[#1A1D1F]" />
            <span className="font-bold">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
