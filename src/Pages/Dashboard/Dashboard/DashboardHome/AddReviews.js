import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../contexts/AuthProvider";

const AddReviews = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);

  // ডিফল্ট ইমেজ যা ফটো না থাকলে দেখাবে
  const defaultPhoto = "https://i.ibb.co/NTDwNc7/image.webp";

  const onSubmit = (data) => {
    const reviewData = {
      userName: user?.displayName || data.name || "Anonymous User",
      userEmail: user?.email || "No Email Provided",
      rating: Number(data.star),
      reviewText: data.description,
      image: data.image || user?.photoURL || defaultPhoto,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Submission failed");
        return res.json();
      })
      .then((result) => {
        if (result.insertedId) {
          Swal.fire({
            title: "Review Posted!",
            text: "Thank you for sharing your experience with us!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Submission Error",
          text: "Unable to connect to the server. Please try again later.",
          icon: "error",
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-4 fanimate-in fade-in duration-700">
      <div className="card w-full max-w-2xl bg-white shadow-2xl rounded-[32px] border border-gray-100">
        <div className="card-body p-8 md:p-12">
          {/* প্রোফাইল স্ট্যাটাস মেসেজ */}
          {!user?.photoURL && user && (
            <div className="alert alert-sm bg-rose-50 border-rose-100 text-rose-500 rounded-2xl mb-6 flex gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest">
                Notice: You haven't set a profile photo yet. Using a default
                avatar.
              </span>
            </div>
          )}

          <div className="text-center mb-8 text-left">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-[#1A1D1F]">
              Share Your <span className="text-rose-500">Experience</span>
            </h2>
            <p className="text-gray-400 mt-2 italic font-medium">
              Hello, {user?.displayName || "Guest"}! We'd love to hear from you.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="form-control">
                <label className="label text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  Display Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  defaultValue={user?.displayName || ""}
                  {...register("name", { required: !user?.displayName })}
                  className="input input-bordered rounded-xl bg-gray-50 focus:border-rose-300 focus:ring-rose-200"
                />
              </div>

              {/* Rating */}
              <div className="form-control">
                <label className="label text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  Select Rating
                </label>
                <select
                  {...register("star", { required: true })}
                  className="select select-bordered rounded-xl bg-gray-50 focus:border-rose-300"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>
              </div>
            </div>

            {/* Profile Image URL */}
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Profile Photo URL
              </label>
              <input
                type="text"
                placeholder="Link your photo here"
                defaultValue={user?.photoURL || ""}
                {...register("image")}
                className="input input-bordered rounded-xl bg-gray-50 focus:border-rose-300"
              />
            </div>

            {/* Review Details */}
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Review Details
              </label>
              <textarea
                placeholder="How was our service?"
                {...register("description", { required: true })}
                className="textarea textarea-bordered h-32 rounded-xl bg-gray-50 focus:border-rose-300"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-8">
              <button
                type="submit"
                className="btn border-none btn-lg rounded-[20px] font-black uppercase tracking-widest text-xs text-white shadow-xl hover:brightness-110 active:scale-95 transition-all"
                style={{ backgroundColor: "#E53E3E" }}
              >
                Post Review Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReviews;
