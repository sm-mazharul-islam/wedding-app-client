// import React from "react";

// const AddPackage = () => {
//   return (
//     <div>
//       <h1>This is add package component</h1>
//     </div>
//   );
// };

// export default AddPackage;
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddPackage = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // 1. Formatting data to EXACTLY match your provided model
    const packageData = {
      name: data.name, // "STANDARD PACKAGE"
      nameTwo: data.nameTwo, // "Diamond Package"
      price: data.price, // "250"
      priceOne: data.priceOne, // "4500"
      description: data.description, // Summary text
      descriptionTwo: data.descriptionTwo, // Detailed list
      image: data.image, // Thumbnail URL
      headerImage: data.headerImage || "https://i.ibb.co/FxryvZx/default.jpg",
    };

    fetch("http://localhost:5000/servicesPackage", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(packageData),
    })
      .then((res) => {
        // If the response is not JSON, this will show the HTML error in the console
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
        return res.json();
      })
      .then((result) => {
        if (result.insertedId) {
          Swal.fire({ title: "Success!", icon: "success" });
          reset();
        }
      })
      .catch((error) => {
        console.error("Server Error Details:", error.message);
        Swal.fire("Error", "Check backend connection.", "error");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-[32px] shadow-sm border border-gray-100 mt-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold font-serif">Add Wedding Package</h2>
        <div className="divider w-24 mx-auto border-primary"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Name (e.g., STANDARD PACKAGE) */}
          <div className="form-control">
            <label className="label font-semibold">Primary Package Name</label>
            <input
              type="text"
              placeholder="STANDARD PACKAGE"
              {...register("name", { required: true })}
              className="input input-bordered focus:border-primary"
            />
          </div>

          {/* Sub Name (e.g., Diamond Package) */}
          <div className="form-control">
            <label className="label font-semibold">Display Title</label>
            <input
              type="text"
              placeholder="Diamond Package"
              {...register("nameTwo", { required: true })}
              className="input input-bordered focus:border-primary"
            />
          </div>

          {/* Base Price (e.g., 250) */}
          <div className="form-control">
            <label className="label font-semibold">Base Price ($)</label>
            <input
              type="text"
              placeholder="250"
              {...register("price", { required: true })}
              className="input input-bordered focus:border-primary"
            />
          </div>

          {/* Package Price (e.g., 4500) */}
          <div className="form-control">
            <label className="label font-semibold">
              Total Package Price ($)
            </label>
            <input
              type="text"
              placeholder="4500"
              {...register("priceOne", { required: true })}
              className="input input-bordered focus:border-primary"
            />
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label font-semibold">Thumbnail URL</label>
            <input
              type="text"
              placeholder="https://i.ibb.co/..."
              {...register("image", { required: true })}
              className="input input-bordered focus:border-primary"
            />
          </div>

          {/* Header Image URL */}
          <div className="form-control">
            <label className="label font-semibold">Header Image URL</label>
            <input
              type="text"
              placeholder="https://i.ibb.co/..."
              {...register("headerImage")}
              className="input input-bordered focus:border-primary"
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="form-control">
          <label className="label font-semibold">Short Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered h-20"
            placeholder="Makeup, meals, polish..."
          ></textarea>
        </div>

        {/* Detailed Description */}
        <div className="form-control">
          <label className="label font-semibold">
            Detailed Features (Full List)
          </label>
          <textarea
            {...register("descriptionTwo", { required: true })}
            className="textarea textarea-bordered h-32"
            placeholder="Booking church, Interpreter, Photographer..."
          ></textarea>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full md:w-1/2 text-lg"
          >
            Save Wedding Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
