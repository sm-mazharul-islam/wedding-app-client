import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  User,
  Briefcase,
  Users,
  CheckCircle,
  ArrowLeft,
  GraduationCap,
  Info,
  Mail,
  Phone,
  ZoomIn,
} from "lucide-react";

const FindYourMatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/findYourMatch.json")
      .then((res) => res.json())
      .then((data) => {
        const foundPerson = data.find((item) => item.id === id);
        setPerson(foundPerson);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching detail:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-black">
        LOADING BIODATA...
      </div>
    );
  if (!person)
    return (
      <div className="min-h-screen flex items-center justify-center font-black">
        BIODATA NOT FOUND
      </div>
    );

  return (
    <div className="min-h-screen bg-white font-sans text-stone-800">
      {/* Container for Split Layout on Desktop */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* --- Left Side: Fixed Image for Large/Medium Devices --- */}
        <aside className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 bg-stone-100 overflow-hidden group">
          <img
            src={person.image}
            className="w-full h-[500px] lg:h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            alt={person.name}
          />
          {/* Back Button Overlay */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-2xl hover:bg-white transition-all active:scale-95 z-20"
          >
            <ArrowLeft size={24} className="text-[#1A1D1F]" />
          </button>
          {/* Soft Shadow Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"></div>
        </aside>

        {/* --- Right Side: Scrollable Details Section --- */}
        <main className="w-full lg:w-1/2 px-6 py-12 lg:px-16 lg:py-20 bg-white">
          <div className="max-w-2xl mx-auto">
            {/* Header Header */}
            <div className="mb-12 text-left border-b border-rose-100 pb-10">
              <span className="bg-rose-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 inline-block">
                {person.type} Biodata
              </span>
              <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-[#1A1D1F] leading-tight mb-4 uppercase">
                {person.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-6">
                <p className="flex items-center gap-2 text-stone-400 font-bold italic text-lg">
                  <MapPin size={22} className="text-rose-400" />{" "}
                  {person.address}
                </p>
                <button className="px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl bg-[#E53E3E] hover:brightness-110 transition-all active:scale-95">
                  Contact Family
                </button>
              </div>
            </div>

            {/* Information Grid (Single Column on Right) */}
            <div className="space-y-16 text-left">
              {/* Academic & Professional Combined */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <section>
                  <h3 className="flex items-center gap-2 text-rose-500 font-black uppercase text-[10px] tracking-widest mb-6 border-l-4 border-rose-500 pl-3">
                    <GraduationCap size={18} /> Education
                  </h3>
                  <div className="space-y-4 bg-rose-50/30 p-8 rounded-[2rem] border border-rose-50">
                    <DetailRow
                      label="S.S.C"
                      value={person.academicStatus.ssc}
                    />
                    <DetailRow
                      label="H.S.C"
                      value={person.academicStatus.hsc}
                    />
                    <DetailRow
                      label="Honors"
                      value={person.academicStatus.honors}
                    />
                  </div>
                </section>

                <section>
                  <h3 className="flex items-center gap-2 text-rose-500 font-black uppercase text-[10px] tracking-widest mb-6 border-l-4 border-rose-500 pl-3">
                    <Briefcase size={18} /> Professional
                  </h3>
                  <div className="space-y-4 bg-rose-50/30 p-8 rounded-[2rem] border border-rose-50">
                    <DetailRow
                      label="Status"
                      value={person.professionalInfo.jobStatus}
                    />
                    <DetailRow
                      label="Salary"
                      value={person.professionalInfo.salary}
                    />
                    <DetailRow
                      label="Exp"
                      value={person.professionalInfo.experience}
                    />
                  </div>
                </section>
              </div>

              {/* Family Details */}
              <section>
                <h3 className="flex items-center gap-2 text-rose-500 font-black uppercase text-[10px] tracking-widest mb-6 border-l-4 border-rose-500 pl-3">
                  <Users size={18} /> Family Background
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-stone-50 p-8 rounded-[2.5rem] border border-stone-100">
                  <DetailRow
                    label="Father"
                    value={person.familyDetails.fatherProfession}
                  />
                  <DetailRow
                    label="Mother"
                    value={person.familyDetails.motherProfession}
                  />
                  <DetailRow
                    label="Siblings"
                    value={person.familyDetails.totalSiblings}
                  />
                  <DetailRow
                    label="Order"
                    value={person.familyDetails.childOrder}
                  />
                </div>
              </section>

              {/* Physical & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <section>
                  <h3 className="flex items-center gap-2 text-rose-500 font-black uppercase text-[10px] tracking-widest mb-6 border-l-4 border-rose-500 pl-3">
                    <User size={18} /> Physical
                  </h3>
                  <div className="space-y-4 bg-stone-50 p-8 rounded-[2rem] border border-stone-100">
                    <DetailRow
                      label="Height"
                      value={person.physicalAttributes.height}
                    />
                    <DetailRow
                      label="Weight"
                      value={person.physicalAttributes.weight}
                    />
                    <DetailRow
                      label="Complexion"
                      value={person.physicalAttributes.bodyColor}
                    />
                  </div>
                </section>

                <section>
                  <h3 className="flex items-center gap-2 text-rose-500 font-black uppercase text-[10px] tracking-widest mb-6 border-l-4 border-rose-500 pl-3">
                    <Mail size={18} /> Contact
                  </h3>
                  <div className="space-y-4 bg-rose-50/30 p-8 rounded-[2rem] border border-rose-50">
                    <div className="flex items-center gap-3 text-sm font-bold">
                      <Phone size={16} className="text-rose-500" />{" "}
                      {person.contact}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold">
                      <Mail size={16} className="text-rose-500" />{" "}
                      {person.email}
                    </div>
                  </div>
                </section>
              </div>

              {/* About & Expectations */}
              <div className="pt-10 border-t border-rose-100 space-y-10">
                <section>
                  <h3 className="text-rose-500 font-black uppercase text-[10px] tracking-widest mb-4 italic underline">
                    Personal Bio
                  </h3>
                  <p className="text-xl font-medium text-stone-500 leading-relaxed italic italic">
                    "{person.personalBio}"
                  </p>
                </section>
                <section>
                  <h3 className="text-rose-500 font-black uppercase text-[10px] tracking-widest mb-4 italic underline">
                    Expectations
                  </h3>
                  <p className="text-xl font-medium text-stone-500 leading-relaxed italic border-l-4 border-rose-100 pl-6">
                    "{person.expectations}"
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-rose-100/20 pb-2.5">
    <span className="text-stone-400 text-[9px] font-black uppercase tracking-[0.1em]">
      {label}
    </span>
    <span className="text-[#1A1D1F] font-bold text-[13px] tracking-tight">
      {value}
    </span>
  </div>
);

export default FindYourMatchDetail;
