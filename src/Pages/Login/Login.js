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

  // --- ডাটাবেজ এবং লোকাল স্টোরেজ সিঙ্ক ---
  const checkUserInDb = (user) => {
    // ১. লোকাল স্টোরেজে ইমেইল সেভ করা (এটিই আপনার সমস্যার মূল সমাধান)
    localStorage.setItem("userEmail", user.email);

    const currentUser = {
      email: user.email,
      name: user.displayName || user.email.split("@")[0],
      image: user.photoURL,
      role: "user",
    };

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
        // DB এরর হলেও নেভিগেট করুন যাতে ইউজার আটকে না থাকে
        navigate(from, { replace: true });
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
      <div className="w-full max-w-[450px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[40px] overflow-hidden border border-white/20">
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
            <div className="form-control group">
              <label className="label py-1">
                <span className="label-text font-bold text-[11px] uppercase tracking-[2px] text-gray-400">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="input w-full pl-12 bg-[#FAF7F6] border-none rounded-2xl h-14 font-medium"
                />
              </div>
            </div>

            <div className="form-control group">
              <label className="label py-1 flex justify-between">
                <span className="label-text font-bold text-[11px] uppercase tracking-[2px] text-gray-400">
                  Password
                </span>
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="input w-full pl-12 bg-[#FAF7F6] border-none rounded-2xl h-14 font-medium"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-red-600 text-[11px] font-bold text-center italic">
                {loginError}
              </p>
            )}

            <button
              disabled={isLogging}
              className="btn w-full bg-[#1A1D1F] text-white rounded-2xl h-14 border-none shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:bg-gray-400"
            >
              {isLogging ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {" "}
                  <span className="font-bold">Login to Dashboard</span>{" "}
                  <ArrowRight size={20} />{" "}
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              className="text-[#1A1D1F] font-black hover:underline"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>

          <div className="divider my-10 text-[10px] font-black uppercase tracking-[3px] text-gray-300">
            Quick Access
          </div>

          <button
            onClick={handleGoogleLogin}
            className="btn w-full bg-white border-2 border-[#FAF7F6] text-[#1A1D1F] rounded-2xl h-14 shadow-sm flex items-center justify-center gap-4 active:scale-95"
          >
            <Chrome size={20} />
            <span className="font-bold">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
