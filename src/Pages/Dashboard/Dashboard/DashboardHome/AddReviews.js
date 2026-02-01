// const AddReviews = () => {
//   return (
//     <div>
//       <h1>This is Review page</h1>
//     </div>
//   );
// };

// export default AddReviews;
//!

import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2"; // Optional: For beautiful alerts

const AddReviews = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const reviewData = {
      ...data,
      image: data.image || "https://i.ibb.co/NTDwNc7/image.webp",
      date: new Date().toLocaleDateString(),
    };

    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => {
        // Safety check: If response is not OK, log the status
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        if (result.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your review has been posted.",
            icon: "success",
            confirmButtonColor: "#1A1D1F",
          });
          reset();
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        alert("Submission failed. Check the console for details.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl border border-gray-100">
        <div className="card-body p-8 md:p-12">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-neutral">
              Share Your Experience
            </h2>
            <p className="text-gray-400 mt-2 italic">
              Your feedback helps our wedding community grow.
            </p>
            <div className="divider w-24 mx-auto border-primary"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Anna Mary"
                  {...register("name", { required: true })}
                  className="input input-bordered focus:input-primary transition-all bg-gray-50"
                />
              </div>

              {/* Rating (Star) Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Rating</span>
                </label>
                <select
                  {...register("star", { required: true })}
                  className="select select-bordered focus:select-primary bg-gray-50"
                >
                  <option value="5">5 Stars - Perfection</option>
                  <option value="4">4 Stars - Great</option>
                  <option value="3">3 Stars - Good</option>
                  <option value="2">2 Stars - Average</option>
                  <option value="1">1 Star - Poor</option>
                </select>
              </div>
            </div>

            {/* Image URL Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Profile Image URL
                </span>
              </label>
              <input
                type="text"
                placeholder="https://i.ibb.co/..."
                {...register("image")}
                className="input input-bordered focus:input-primary bg-gray-50"
              />
            </div>

            {/* Review Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Your Story</span>
              </label>
              <textarea
                placeholder="Tell us about your wedding experience..."
                {...register("description", { required: true })}
                className="textarea textarea-bordered focus:textarea-primary h-32 bg-gray-50 text-base"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-8">
              <button
                type="submit"
                className="btn btn-primary btn-lg normal-case text-lg shadow-lg hover:shadow-primary/30 transition-all"
              >
                Post Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReviews;
