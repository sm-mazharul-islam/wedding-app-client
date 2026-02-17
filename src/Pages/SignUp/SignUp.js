import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Mail, Lock, User, Loader2, Eye, EyeOff, Camera } from "lucide-react";
import { AuthContext } from "../../contexts/AuthProvider";
import BASE_URL from "../../config";

const SignUp = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null); // ইমেজ ফাইল সেভ করার জন্য

  const navigate = useNavigate();
  const destination = "/dashboard";

  // --- Cloudinary Upload Configuration ---
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    formData.append("upload_preset", uploadPreset); // Cloudinary থেকে পাওয়া Preset নাম এখানে দিন

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // আপনার Cloud Name এখানে দিন
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await res.json();
    return data.secure_url; // আপলোড করা ইমেজের লিঙ্ক রিটার্ন করবে
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      if (!imageFile) throw new Error("Please upload a profile picture.");

      // ১. Cloudinary-তে ইমেজ আপলোড করা
      const photoURL = await uploadImageToCloudinary(imageFile);

      // ২. ফায়ারবেসে ইউজার তৈরি করা
      await createUser(email, password);

      // ৩. ইউজারের নাম এবং প্রোফাইল পিকচার ফায়ারবেসে আপডেট করা
      await updateUser({ displayName: name, photoURL: photoURL });

      // ৪. MongoDB ডাটাবেজে ইউজার ডাটা সেভ করা
      const newUser = {
        name,
        email,
        photoURL,
        role: "user",
        createdAt: new Date(),
      };

      const dbRes = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (dbRes.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Welcome to your gorgeous dashboard",
          timer: 2000,
          showConfirmButton: false,
          customClass: { popup: "rounded-[32px]" },
        });
        navigate(destination, { replace: true });
      } else {
        throw new Error("Failed to save user in Database.");
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
        <div className="bg-[#1A1D1F] p-10 text-white text-center relative overflow-hidden">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase relative z-10">
            Sign Up
          </h2>
          <p className="text-gray-400 text-sm italic relative z-10">
            Join the legacy of love
          </p>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleSignUp} className="space-y-5 text-left">
            {/* Image Upload Field */}
            <div className="flex flex-col items-center mb-6">
              <label className="relative cursor-pointer group">
                <div className="w-24 h-24 rounded-full bg-[#FAF7F6] border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-rose-400">
                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      className="w-full h-full object-cover"
                      alt="preview"
                    />
                  ) : (
                    <Camera
                      className="text-gray-300 group-hover:text-rose-400"
                      size={30}
                    />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                <div className="absolute bottom-0 right-0 bg-stone-900 text-white p-1.5 rounded-full border-2 border-white">
                  <Camera size={12} />
                </div>
              </label>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                Upload Profile Picture
              </span>
            </div>

            {/* Full Name */}
            <div className="form-control group">
              <label className="label py-1 font-bold text-[10px] uppercase text-gray-400 tracking-widest">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-stone-900"
                  size={18}
                />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="input w-full pl-12 bg-[#FAF7F6] border-none rounded-2xl h-14 font-medium focus:ring-2 focus:ring-stone-100 transition-all outline-none"
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-stone-900"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="input w-full pl-12 bg-[#FAF7F6] border-none rounded-2xl h-14 font-medium focus:ring-2 focus:ring-stone-100 transition-all outline-none"
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-stone-900"
                  size={18}
                />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  placeholder="Min 6 characters"
                  className="input w-full pl-12 pr-12 bg-[#FAF7F6] border-none rounded-2xl h-14 font-medium focus:ring-2 focus:ring-stone-100 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-stone-900"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-[10px] font-bold text-center italic">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="btn w-full bg-[#1A1D1F] hover:bg-black text-white rounded-2xl h-14 border-none shadow-xl flex items-center justify-center transition-all active:scale-95 disabled:bg-gray-400 mt-4 font-black uppercase tracking-[2px] text-xs"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Register Now"
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-stone-900 font-bold underline underline-offset-4"
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
