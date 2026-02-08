// //!!!
// import React, { useContext, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthProvider";

// const SignUp = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { createUser, updateUser } = useContext(AuthContext);
//   const [signUpError, setSignUpError] = useState("");
//   const navigate = useNavigate();

//   const saveUserToDb = (name, email) => {
//     const user = { name, email, role: "user" }; // Default role
//     fetch("http://localhost:5000/users", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(user),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.acknowledged) {
//           navigate("/dashboard"); // Successful login redirect
//         }
//       })
//       .catch((err) => console.error("Database Sync Error:", err));
//   };

//   const handleSignUp = (data) => {
//     setSignUpError("");
//     createUser(data.email, data.password)
//       .then((result) => {
//         const registeredUser = result.user;
//         toast.success("Registration Successful!");
//         updateUser(registeredUser, { displayName: data.name })
//           .then(() => {
//             saveUserToDb(data.name, data.email); // Link to MongoDB
//           })
//           .catch((err) => console.log(err));
//       })
//       .catch((error) => setSignUpError(error.message));
//   };

//   return (
//     <div className="h-[600px] flex justify-center items-center p-6 bg-white shadow-lg rounded-xl">
//       <form onSubmit={handleSubmit(handleSignUp)} className="w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
//         <input
//           type="text"
//           {...register("name", { required: true })}
//           placeholder="Name"
//           className="input input-bordered w-full mb-2"
//         />
//         <input
//           type="email"
//           {...register("email", { required: true })}
//           placeholder="Email"
//           className="input input-bordered w-full mb-2"
//         />
//         <input
//           type="password"
//           {...register("password", { required: true, minLength: 6 })}
//           placeholder="Password"
//           className="input input-bordered w-full mb-4"
//         />
//         <input
//           className="btn btn-accent w-full text-white"
//           value="Sign Up"
//           type="submit"
//         />
//         {signUpError && (
//           <p className="text-red-600 text-center mt-2">{signUpError}</p>
//         )}
//         <p className="text-center mt-4">
//           Already registered?{" "}
//           <Link to="/login" className="text-secondary">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignUp;
//!
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { AuthContext } from "../../contexts/AuthProvider";

const SignUp = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // এখানে সরাসরি "/dashboard" পাথটি ডিফাইন করে দেওয়া হয়েছে যাতে লগইন পেজে না যায়
  const destination = "/dashboard";

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // ১. ফায়ারবেসে ইউজার তৈরি করা
      await createUser(email, password);

      // ২. ইউজারের নাম আপডেট করা
      await updateUser({ displayName: name });

      // ৩. MongoDB ডাটাবেজে ইউজার ডাটা সেভ করা
      const newUser = {
        name,
        email,
        role: "user",
        createdAt: new Date(),
      };

      const dbRes = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });

      // ৪. ডাটাবেজে সেভ হওয়ার পর সরাসরি ড্যাশবোর্ডে পাঠানো
      if (dbRes.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Welcome to your dashboard",
          timer: 2000,
          showConfirmButton: false,
          customClass: { popup: "rounded-[32px]" },
        });

        // এখানে 'replace: true' দেওয়া হয়েছে যাতে ব্রাউজারের ব্যাক বাটনে চাপলে আবার সাইন-আপ পেজ না আসে
        navigate(destination, { replace: true });
      } else {
        throw new Error(
          "Failed to save user in MongoDB. Registration cancelled.",
        );
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.message || "An error occurred during sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F6] p-4 font-sans text-[#1A1D1F]">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-[40px] overflow-hidden border border-gray-100">
        <div className="bg-[#1A1D1F] p-10 text-white text-center">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">
            Sign Up
          </h2>
          <p className="text-gray-400 text-sm italic">
            Start your professional journey
          </p>
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleSignUp} className="space-y-5 text-left">
            {/* Full Name */}
            <div className="form-control group">
              <label className="label py-1 font-bold text-[10px] uppercase text-gray-400 tracking-widest">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1A1D1F]"
                  size={18}
                />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="input w-full pl-12 bg-[#FAF7F6] border-none rounded-2xl h-14 font-medium focus:ring-2 focus:ring-[#1A1D1F]/5 transition-all outline-none"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="form-control group">
              <label className="label py-1 font-bold text-[10px] uppercase text-gray-400 tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1A1D1F]"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="input w-full pl-12 bg-[#FAF7F6] border-none rounded-2xl h-14 font-medium focus:ring-2 focus:ring-[#1A1D1F]/5 transition-all outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control group">
              <label className="label py-1 font-bold text-[10px] uppercase text-gray-400 tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1A1D1F]"
                  size={18}
                />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  placeholder="Min 6 characters"
                  className="input w-full pl-12 pr-12 bg-[#FAF7F6] border-none rounded-2xl h-14 font-medium focus:ring-2 focus:ring-[#1A1D1F]/5 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#1A1D1F] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-[10px] font-bold text-center italic animate-pulse">
                {error}
              </p>
            )}

            {/* Registration Button */}
            <button
              disabled={loading}
              className="btn w-full bg-[#1A1D1F] hover:bg-black text-white rounded-2xl h-14 border-none shadow-xl flex items-center justify-center transition-all active:scale-95 disabled:bg-gray-400"
            >
              <span
                key={loading ? "loading" : "normal"}
                className="flex items-center gap-2 uppercase text-xs tracking-[2px] font-bold"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Processing...
                  </>
                ) : (
                  <>
                    Register Now <ArrowRight size={20} />
                  </>
                )}
              </span>
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#1A1D1F] font-bold underline underline-offset-4"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
