import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { PackagePlus, ImageIcon, DollarSign, star } from "lucide-react";

const AddProducts = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    // ডাটা টাইপ কনভার্ট করা এবং ইমেজ অ্যারে তৈরি করা
    const productData = {
      name: data.name,
      inStock: parseInt(data.inStock),
      inStockTwo: data.inStockTwo || "Coming Soon",
      // আপনার দেওয়া ডাটা অনুযায়ী ইমেজগুলোকে অ্যারেতে সাজানো হয়েছে
      image: [
        { id: "img1", url: data.img1 },
        { id: "img2", url: data.img2 || data.img1 },
        { id: "img3", url: data.img3 || data.img1 },
        { id: "img4", url: data.img4 || data.img1 },
      ],
      priceOne: parseFloat(data.priceOne),
      priceTwo: parseFloat(data.priceTwo),
      description: data.description,
      rating: parseFloat(data.rating) || 4,
    };

    try {
      const response = await fetch("http://localhost:5000/weddingShop", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(productData),
      });

      // এরর হ্যান্ডেলিং: যদি রেসপন্স JSON না হয়
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Backend route not found (404). Check your server code.",
        );
      }

      const result = await response.json();

      if (result.acknowledged) {
        Swal.fire({
          title: "Success!",
          text: "Product added to Wedding Shop successfully!",
          icon: "success",
          confirmButtonColor: "#1A1D1F",
        });
        reset(); // ফর্ম ক্লিয়ার করা
      }
    } catch (err) {
      console.error("Submission Error:", err);
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="p-10 bg-base-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <PackagePlus className="text-primary" size={30} />
          <h1 className="text-3xl font-bold font-serif text-[#1A1D1F]">
            Add Product to Wedding Shop
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Product Name */}
          <div className="form-control md:col-span-2">
            <label className="label font-bold">Product Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="e.g. Aelis Fecilis"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Pricing */}
          <div className="form-control">
            <label className="label font-bold">Old Price ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("priceOne")}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label font-bold">Sale Price ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("priceTwo")}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Stock Info */}
          <div className="form-control">
            <label className="label font-bold">Stock Quantity</label>
            <input
              type="number"
              {...register("inStock")}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label font-bold">Stock Status</label>
            <input
              type="text"
              {...register("inStockTwo")}
              placeholder="Coming Soon"
              className="input input-bordered w-full"
            />
          </div>

          {/* Rating & Image 1 */}
          <div className="form-control">
            <label className="label font-bold">Rating (1-5)</label>
            <input
              type="number"
              step="0.1"
              {...register("rating")}
              placeholder="4"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label font-bold">Main Image URL</label>
            <input
              type="text"
              {...register("img1")}
              placeholder="https://..."
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Optional Gallery Images */}
          <div className="form-control md:col-span-2">
            <label className="label font-bold">
              Gallery Image URLs (Optional)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                type="text"
                {...register("img2")}
                placeholder="Image URL 2"
                className="input input-bordered input-sm"
              />
              <input
                type="text"
                {...register("img3")}
                placeholder="Image URL 3"
                className="input input-bordered input-sm"
              />
              <input
                type="text"
                {...register("img4")}
                placeholder="Image URL 4"
                className="input input-bordered input-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-control md:col-span-2">
            <label className="label font-bold">Description</label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-24"
              required
            ></textarea>
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="btn btn-primary w-full btn-lg shadow-xl shadow-primary/20"
            >
              Publish to Wedding Shop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
