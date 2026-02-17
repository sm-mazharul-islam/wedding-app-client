import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  UserPlus,
  Image,
  BookOpen,
  Briefcase,
  Users,
  Heart,
} from "lucide-react";

const AdminCreateBiodata = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      age: parseInt(data.age),
      birthYear: parseInt(data.birthYear),
      physicalAttributes: {
        height: data.height,
        weight: data.weight,
        bodyColor: data.bodyColor,
      },
      academicStatus: {
        ssc: data.ssc,
        hsc: data.hsc,
        honors: data.honors,
      },
      professionalInfo: {
        jobStatus: data.jobStatus,
        category: data.category,
        company: data.company,
        experience: data.experience,
        salary: data.salary,
      },
      familyDetails: {
        fatherName: data.fatherName,
        fatherProfession: data.fatherProfession,
        motherName: data.motherName,
        motherProfession: data.motherProfession,
        totalSiblings: parseInt(data.totalSiblings),
        childOrder: data.childOrder,
      },
    };

    try {
      const res = await fetch("http://localhost:5000/biodata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Biodata Created!",
          text: "New profile has been added to the registry.",
          customClass: { popup: "rounded-[30px]" },
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const inputStyle =
    "w-full px-5 py-3.5 bg-stone-50 border-none rounded-2xl focus:ring-4 focus:ring-rose-500/10 outline-none font-bold text-sm transition-all";
  const labelStyle =
    "text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 block ml-2";

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto animate-in fade-in duration-700 text-left">
      <div className="mb-10">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-stone-800">
          Create <span className="text-rose-500">New Biodata</span>
        </h2>
        <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
          Registry Management System
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 pb-20">
        {/* --- Section 1: Basic Info --- */}
        <div className="bg-white p-8 md:p-12 rounded-[40px] border border-stone-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <UserPlus className="text-rose-500" size={24} />
            <h3 className="font-black text-xl italic uppercase tracking-tight">
              Basic Identification
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelStyle}>Full Name</label>
              <input
                {...register("name")}
                placeholder="Write Your Name"
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className={labelStyle}>Biodata Type</label>
              <select {...register("type")} className={inputStyle}>
                <option value="Groom">Groom</option>
                <option value="Bride">Bride</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>Marital Status</label>
              <input
                {...register("status")}
                placeholder="Never Married"
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Birth Year</label>
              <input
                {...register("birthYear")}
                type="number"
                placeholder="1995"
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Current Age</label>
              <input
                {...register("age")}
                type="number"
                placeholder="31"
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Religion</label>
              <input
                {...register("religion")}
                placeholder="Muslim"
                className={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* --- Section 2: Contact & Media --- */}
        <div className="bg-white p-8 md:p-12 rounded-[40px] border border-stone-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Image className="text-rose-500" size={24} />
            <h3 className="font-black text-xl italic uppercase tracking-tight">
              Contact & Media
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>Photo URL</label>
              <input
                {...register("image")}
                placeholder="https://unsplash.com/..."
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Contact Number</label>
              <input
                {...register("contact")}
                placeholder="+88017..."
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Email Address</label>
              <input
                {...register("email")}
                type="email"
                placeholder="user@email.com"
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Address (City, Area)</label>
              <input
                {...register("address")}
                placeholder="Banani, Dhaka"
                className={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* --- Section 3: Professional & Academic --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-rose-500" size={20} />{" "}
              <h4 className="font-black italic uppercase">Education</h4>
            </div>
            <div className="space-y-4">
              <input
                {...register("ssc")}
                placeholder="SSC GPA"
                className={inputStyle}
              />
              <input
                {...register("hsc")}
                placeholder="HSC GPA"
                className={inputStyle}
              />
              <input
                {...register("honors")}
                placeholder="Honors/Degree"
                className={inputStyle}
              />
            </div>
          </div>
          <div className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-rose-500" size={20} />{" "}
              <h4 className="font-black italic uppercase">Profession</h4>
            </div>
            <div className="space-y-4">
              <input
                {...register("jobStatus")}
                placeholder="Job Status"
                className={inputStyle}
              />
              <input
                {...register("category")}
                placeholder="Job Category"
                className={inputStyle}
              />
              <input
                {...register("salary")}
                placeholder="Monthly Salary"
                className={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* --- Section 4: Physical & Bio --- */}
        <div className="bg-white p-8 md:p-12 rounded-[40px] border border-stone-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="text-rose-500" size={24} />{" "}
            <h3 className="font-black text-xl italic uppercase tracking-tight">
              Personal Details
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <input
              {...register("height")}
              placeholder="Height (e.g. 5'10'')"
              className={inputStyle}
            />
            <input
              {...register("weight")}
              placeholder="Weight (e.g. 75kg)"
              className={inputStyle}
            />
            <input
              {...register("bodyColor")}
              placeholder="skin tone"
              className={inputStyle}
            />
          </div>
          <div className="space-y-6">
            <div>
              <label className={labelStyle}>Expectations</label>
              <textarea
                {...register("expectations")}
                className={`${inputStyle} h-24 resize-none`}
                placeholder="Describe partner expectations..."
              ></textarea>
            </div>
            <div>
              <label className={labelStyle}>Personal Bio</label>
              <textarea
                {...register("personalBio")}
                className={`${inputStyle} h-24 resize-none`}
                placeholder="Short biography..."
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn border-none btn-lg rounded-[20px] font-black uppercase tracking-widest text-xs text-white shadow-xl hover:brightness-110 active:scale-95 transition-all w-full"
          style={{ backgroundColor: "#E53E3E" }}
        >
          Publish Biodata
        </button>
      </form>
    </div>
  );
};

export default AdminCreateBiodata;
