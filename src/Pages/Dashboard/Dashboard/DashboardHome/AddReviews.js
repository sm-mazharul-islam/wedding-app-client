import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../contexts/AuthProvider";

const AddReviews = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);

  const onSubmit = (data) => {
    // এখানে ডাটাবেজে পাঠানোর আগে প্রসেসিং করা হচ্ছে
    const reviewData = {
      userName: user?.displayName || data.name,
      userEmail: user?.email,
      // 'star' কে স্ট্রিং থেকে নম্বরে রূপান্তর করা হলো (Critical Fix)
      rating: Number(data.star),
      reviewText: data.description,
      image:
        data.image || user?.photoURL || "https://i.ibb.co/NTDwNc7/image.webp",
      date: new Date().toISOString(), // সঠিক ডেট ফরম্যাট
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
            text: "আপনার মূল্যবান মতামতটি ডেটাবেজে নম্বর হিসেবে জমা হয়েছে।",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Error", "সার্ভারের সাথে সংযোগ করা যাচ্ছে না।", "error");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-4 bg-gray-50 animate-in fade-in duration-700">
      <div className="card w-full max-w-2xl bg-white shadow-2xl rounded-[32px] border border-gray-100">
        <div className="card-body p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#1A1D1F]">
              Share Your Experience
            </h2>
            <p className="text-gray-400 mt-2 italic">
              আপনার দেওয়া রেটিং সরাসরি আমাদের চার্টে প্রভাব ফেলবে।
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-gray-400 tracking-widest">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName || ""}
                  {...register("name", { required: true })}
                  className="input input-bordered rounded-xl bg-gray-50 focus:ring-primary"
                />
              </div>

              {/* Rating Dropdown */}
              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-gray-400 tracking-widest">
                  Select Rating
                </label>
                <select
                  {...register("star", { required: true })}
                  className="select select-bordered rounded-xl bg-gray-50"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>
              </div>
            </div>

            {/* Profile Image */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase text-gray-400 tracking-widest">
                Profile Photo URL
              </label>
              <input
                type="text"
                defaultValue={user?.photoURL || ""}
                {...register("image")}
                className="input input-bordered rounded-xl bg-gray-50"
              />
            </div>

            {/* Review Description */}
            <div className="form-control">
              <label className="label text-xs font-bold uppercase text-gray-400 tracking-widest">
                Review Details
              </label>
              <textarea
                placeholder="আপনার অভিজ্ঞতা বিস্তারিত লিখুন..."
                {...register("description", { required: true })}
                className="textarea textarea-bordered h-32 rounded-xl bg-gray-50"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="form-control mt-8">
              <button
                type="submit"
                className="btn btn-primary btn-lg rounded-2xl normal-case shadow-lg"
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
