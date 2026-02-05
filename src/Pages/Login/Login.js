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

//   const handleLogin = (data) => {
//     console.log(data);
//     setLoginError("");
//     signIn(data.email, data.password)
//       .then((result) => {
//         const user = result.user;
//         console.log(user);
//         navigate(from, { replace: true });
//       })
//       .catch((error) => {
//         console.log(error.message);
//         setLoginError(error.message);
//       });
//   };
//   const handleGoogleLogin = () => {
//     signUsingGoogle(location, navigate);
//     console.log(location);
//     navigate(from, { replace: true });
//   };

//   return (
//     <div className="h-[500px] flex justify-center items-center card w-96 bg-base-100 shadow-xl mx-auto m-11 t4 ">
//       <div className="w-96 p-7">
//         <h2 className="text-xl text-center">Login</h2>
//         <form onSubmit={handleSubmit(handleLogin)}>
//           <div className="form-control w-full max-w-xs">
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               type="text"
//               {...register("email", {
//                 required: "Email Address is required",
//               })}
//               className="input input-bordered w-full max-w-xs"
//             />
//             {errors.email && (
//               <p className="text-red-600">{errors.email?.message}</p>
//             )}
//           </div>
//           <div className="form-control w-full max-w-xs">
//             <label className="label">
//               <span className="label-text">Password</span>
//             </label>
//             <input
//               type="password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be 6 Characters or longer",
//                 },
//               })}
//               className="input input-bordered w-full max-w-xs"
//             />
//             <label className="label">
//               <span className="label-text">Forget Password?</span>
//             </label>
//             {errors.password && (
//               <p className="text-red-600">{errors.password?.message}</p>
//             )}
//           </div>

//           <input
//             className="btn btn-accent w-full"
//             value="Login"
//             type="submit"
//           />
//           <div>
//             {loginError && <p className="text-red-600">{loginError}</p>}
//           </div>
//         </form>
//         <p>
//           New to Wedding Planner?{" "}
//           <Link className="text-secondary" to="/signup">
//             Create new account
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
import { AuthContext } from "../../contexts/AuthProvider";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn, signUsingGoogle } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  // Helper to sync Firebase user with MongoDB
  const saveUserToDb = (user) => {
    const currentUser = {
      email: user.email,
      name: user.displayName || user.email.split("@")[0],
      role: "user", // Default role for all new logins
    };

    fetch("https://wedding-app-server-eight.vercel.app/users", {
      method: "POST", // POST handles the upsert logic
      headers: { "content-type": "application/json" },
      body: JSON.stringify(currentUser),
    })
      .then((res) => res.json())
      .then(() => {
        navigate(from, { replace: true });
      });
  };

  const handleLogin = (data) => {
    setLoginError("");
    signIn(data.email, data.password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => setLoginError(error.message));
  };

  const handleGoogleLogin = () => {
    signUsingGoogle()
      .then((result) => {
        saveUserToDb(result.user); //
      })
      .catch((error) => setLoginError(error.message));
  };

  return (
    <div className="h-[500px] flex justify-center items-center card w-96 bg-base-100 shadow-xl mx-auto m-11">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center font-bold">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="input input-bordered w-full"
            />
          </div>
          <input
            className="btn btn-accent w-full mt-4"
            value="Login"
            type="submit"
          />
          {loginError && (
            <p className="text-red-600 text-center mt-2">{loginError}</p>
          )}
        </form>
        <p className="mt-2 text-center text-sm">
          New here?{" "}
          <Link className="text-secondary" to="/signup">
            Create account
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
