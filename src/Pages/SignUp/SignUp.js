//!!!
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();

  const saveUserToDb = (name, email) => {
    const user = { name, email, role: "user" }; // Default role
    fetch("https://wedding-app-server-eight.vercel.app/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          navigate("/dashboard"); // Successful login redirect
        }
      })
      .catch((err) => console.error("Database Sync Error:", err));
  };

  const handleSignUp = (data) => {
    setSignUpError("");
    createUser(data.email, data.password)
      .then((result) => {
        const registeredUser = result.user;
        toast.success("Registration Successful!");
        updateUser(registeredUser, { displayName: data.name })
          .then(() => {
            saveUserToDb(data.name, data.email); // Link to MongoDB
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => setSignUpError(error.message));
  };

  return (
    <div className="h-[600px] flex justify-center items-center p-6 bg-white shadow-lg rounded-xl">
      <form onSubmit={handleSubmit(handleSignUp)} className="w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Name"
          className="input input-bordered w-full mb-2"
        />
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="input input-bordered w-full mb-2"
        />
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          placeholder="Password"
          className="input input-bordered w-full mb-4"
        />
        <input
          className="btn btn-accent w-full text-white"
          value="Sign Up"
          type="submit"
        />
        {signUpError && (
          <p className="text-red-600 text-center mt-2">{signUpError}</p>
        )}
        <p className="text-center mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-secondary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
