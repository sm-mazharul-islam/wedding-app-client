import React from "react";
import secImg from "../../../Images/section.png";

const EditorialOverlap = () => {
  return (
    <section className="relative py-24  overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.035]">
        <h2 className="text-[22vw] font-serif font-black uppercase tracking-tighter">
          Elegance
        </h2>
      </div>

      <div className="container mx-auto px-5 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* ================= IMAGE CARD ================= */}
          <div className="lg:col-span-7 relative">
            <div className="relative bg-white rounded-[40px] pt-40 pb-12 px-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)] overflow-visible">
              {/* Soft Glow */}
              <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-yellow-100/60 rounded-full blur-3xl" />

              {/* IMAGE (single image only) */}
              <div className="relative -mt-32 z-20 flex justify-center">
                <img
                  src={secImg}
                  alt="Wedding Portrait"
                  className="
                    w-[520px] max-w-full
                    object-cover
                    rounded-[28px]
                    shadow-[0_40px_120px_rgba(0,0,0,0.25)]
                    transition-transform duration-[3000ms] ease-out
                    hover:scale-105
                    mask-image
                  "
                />
              </div>

              {/* Caption */}
              <div className="mt-12 text-center">
                <span className="text-gray-400 uppercase tracking-[0.45em] text-[10px] font-bold">
                  Signature Wedding Portrait
                </span>
              </div>
            </div>
          </div>

          {/* ================= CONTENT CARD ================= */}
          <div className="lg:col-span-5 relative">
            <div className="lg:-ml-24 bg-white/85 backdrop-blur-xl p-8 sm:p-12 md:p-14 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-white">
              {/* Tag */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-pink-300" />
                <span className="text-pink-300 font-black uppercase text-[10px] tracking-[0.5em]">
                  The Bespoke Process
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-[#1A1D1F] leading-[1.1] mb-6">
                Refining Every <br />
                <span className="italic font-light text-gray-400">
                  Intimate Detail.
                </span>
              </h2>

              {/* Text */}
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-10 italic">
                “Our mission is to translate your love story into a visual
                masterpiece that captivates the soul and creates a timeless
                legacy.”
              </p>

              {/* Services */}
              <div className="grid grid-cols-1 gap-4 mb-10">
                {[
                  "Concept Creation",
                  "Logistics Mastery",
                  "Sensory Design",
                ].map((service, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[10px] font-bold">
                      0{i + 1}
                    </div>
                    <span className="text-[#1A1D1F] font-bold text-sm uppercase tracking-widest">
                      {service}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="relative w-full h-14 bg-[#1A1D1F] text-white rounded-full overflow-hidden group">
                <span className="relative z-10 font-bold uppercase text-[10px] tracking-[0.35em]">
                  View Packages
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CSS MASK ===== */}
      <style>{`
        .mask-image {
          -webkit-mask-image: linear-gradient(
            to bottom,
            black 0%,
            black 60%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            black 0%,
            black 60%,
            transparent 100%
          );
        }
      `}</style>
    </section>
  );
};

export default EditorialOverlap;
