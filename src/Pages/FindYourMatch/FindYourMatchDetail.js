import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import Swal from "sweetalert2";
import {
  MapPin,
  ArrowLeft,
  Lock,
  Mail,
  Phone,
  Calendar,
  User,
  Users,
  Award,
  Sparkles,
  Heart,
  Briefcase,
  BookOpen,
  Home,
  Star,
  LogIn,
} from "lucide-react";

const FindYourMatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUnlockedInDb, setIsUnlockedInDb] = useState(false);

  // সরাসরি লোকাল স্টোরেজ থেকে চেক করা হচ্ছে যাতে স্টেট ল্যাগ না করে
  const getStorageEmail = () => localStorage.getItem("userEmail");
  const isLoggedIn = !!getStorageEmail() && getStorageEmail().includes("@");

  const isPremiumUser = person?.isPremium === true || isUnlockedInDb;

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const personRes = await fetch(`http://localhost:5000/biodata/${id}`);
        const personData = await personRes.json();
        setPerson(personData);

        const email = getStorageEmail();
        if (isLoggedIn && email) {
          const unlockRes = await fetch(
            `http://localhost:5000/unlocked-requests/${email.toLowerCase()}`,
          );
          const unlockedList = await unlockRes.json();
          setIsUnlockedInDb(unlockedList.some((item) => item.biodataId === id));
        } else {
          setIsUnlockedInDb(false); // লগআউট থাকলে ডাটাবেজ স্টেট রিসেট
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isLoggedIn]);

  const handlePremiumClick = async () => {
    const email = getStorageEmail();

    // STRICT CHECK: লগইন না থাকলে বা ইমেইল না থাকলে সরাসরি আটকে দিবে
    if (!isLoggedIn || !email) {
      Swal.fire({
        title: "Access Denied",
        text: "Please login with your account to unlock this connection.",
        icon: "error",
        confirmButtonText: "Sign In Now",
        customClass: { popup: "rounded-[30px]" },
      }).then(() => navigate("/login"));
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/unlock-premium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: email.toLowerCase(),
          biodataId: person?._id,
          biodataName: person?.name,
          biodataImage: Array.isArray(person?.image)
            ? person?.image[0]?.url
            : person?.image,
          biodataAddress: person?.address,
        }),
      });

      if (response.ok) {
        setIsUnlockedInDb(true);
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        Swal.fire("Success!", "Profile Unlocked Successfully", "success");
      } else {
        const errorData = await response.json();
        Swal.fire("Error", errorData.message || "Request failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server connection failed", "error");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center animate-pulse text-rose-500 font-black tracking-widest">
        SYNCING SECURE DATA...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <nav className="fixed top-0 w-full z-50 p-8 flex justify-between items-center pointer-events-none mt-10 md:mt-20">
        <button
          onClick={() => navigate(-1)}
          className="pointer-events-auto bg-white p-4 rounded-full shadow-xl active:scale-90 transition-transform"
        >
          <ArrowLeft size={20} />
        </button>
      </nav>

      <div className="flex flex-col lg:flex-row min-h-screen">
        <aside className="w-full lg:w-[40%] h-[60vh] lg:h-screen sticky top-0 overflow-hidden bg-stone-900">
          <img
            src={person?.image}
            className={`w-full h-full object-cover transition-all duration-[3000ms] ${isPremiumUser ? "scale-105" : "blur-md brightness-50"}`}
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 text-white text-left">
            <span className="bg-rose-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
              {person?.type}
            </span>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
              {person?.name}
            </h1>
            <p className="flex items-center gap-2 text-rose-300 font-bold mt-3">
              <MapPin size={18} /> {person?.address}
            </p>
          </div>
        </aside>

        <main className="w-full lg:w-[60%] p-6 lg:p-16 space-y-12 bg-white rounded-t-[50px] lg:rounded-none -mt-10 lg:mt-0 z-10 shadow-2xl overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Calendar />}
              label="Age"
              value={`${person?.age} Yrs`}
            />
            <StatCard
              icon={<User />}
              label="Color"
              value={person?.physicalAttributes?.bodyColor}
            />
            <StatCard
              icon={<Users />}
              label="Religion"
              value={person?.religion}
            />
            <StatCard icon={<Star />} label="Status" value={person?.status} />
          </div>

          <div className="text-left space-y-4">
            <h3 className="text-xl font-black uppercase italic tracking-widest flex items-center gap-2 text-stone-800">
              <Sparkles className="text-rose-500" size={20} /> Personal Bio
            </h3>
            <p className="text-stone-500 leading-relaxed font-medium">
              {person?.personalBio}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <InfoSection title="Academic Status" icon={<BookOpen />}>
              <DetailItem label="SSC" value={person?.academicStatus?.ssc} />
              <DetailItem label="HSC" value={person?.academicStatus?.hsc} />
              <DetailItem
                label="Honors"
                value={person?.academicStatus?.honors}
              />
            </InfoSection>
            <InfoSection title="Professional Info" icon={<Briefcase />}>
              <DetailItem
                label="Job Status"
                value={person?.professionalInfo?.jobStatus}
              />
              <DetailItem
                label="Category"
                value={person?.professionalInfo?.category}
              />
              <DetailItem
                label="Salary"
                value={person?.professionalInfo?.salary}
              />
            </InfoSection>
          </div>

          <div
            className={`p-10 rounded-[40px] border border-stone-100 bg-stone-50 text-left transition-all duration-700 ${!isPremiumUser ? "bg-stone-50/50" : "bg-white shadow-xl"}`}
          >
            <h3 className="text-xl font-black uppercase italic mb-8 flex items-center gap-2">
              <Home className="text-rose-500" size={20} /> Family Background
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem
                label="Father"
                value={person?.familyDetails?.fatherName}
                isLocked={!isPremiumUser}
              />
              <DetailItem
                label="Mother"
                value={person?.familyDetails?.motherName}
                isLocked={!isPremiumUser}
              />
              <DetailItem
                label="Siblings"
                value={person?.familyDetails?.totalSiblings}
              />
              <DetailItem
                label="Position"
                value={person?.familyDetails?.childOrder}
              />
            </div>
          </div>

          {/* Premium CTA Section */}
          <section
            className={`p-10 rounded-[40px] border transition-all duration-1000 ${isPremiumUser ? "bg-stone-900 text-white" : "bg-rose-50 border-rose-100"}`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-left">
              <div>
                <h3 className="text-3xl font-black italic">
                  {!isLoggedIn
                    ? "Login Required"
                    : isPremiumUser
                      ? "Full Access Granted"
                      : "Contact Locked"}
                </h3>
                <p
                  className={`text-[10px] font-bold uppercase mt-2 tracking-[0.2em] ${isPremiumUser ? "text-rose-400" : "text-stone-400"}`}
                >
                  {!isLoggedIn
                    ? "Please sign in to take premium access."
                    : isPremiumUser
                      ? "Everything is visible to you now."
                      : "Premium required for private contact info."}
                </p>
              </div>

              {!isPremiumUser && (
                <button
                  onClick={handlePremiumClick}
                  className={`px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center gap-2 transition-all shadow-xl active:scale-95
                    ${
                      !isLoggedIn
                        ? "bg-stone-800 text-white hover:bg-stone-700"
                        : "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200"
                    }`}
                >
                  {isLoggedIn ? <Lock size={14} /> : <LogIn size={14} />}
                  {isLoggedIn ? "Unlock Now" : "Login to Purchase"}
                </button>
              )}
            </div>
          </section>

          {/* Private Contact Section */}
          <div className="flex flex-col md:flex-row gap-10 justify-center pb-20">
            <ContactInfo
              icon={<Mail />}
              label="Email"
              value={isPremiumUser ? person?.email : "hidden@mail.com"}
              isPremiumUser={isPremiumUser}
              isLoggedIn={isLoggedIn}
            />
            <ContactInfo
              icon={<Phone />}
              label="Phone"
              value={isPremiumUser ? person?.contact : "+880 17XX-XXXXXX"}
              isPremiumUser={isPremiumUser}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

// ... Sub-components (StatCard, InfoSection, DetailItem, ContactInfo) remain the same as before ...

const InfoSection = ({ title, icon, children }) => (
  <div className="text-left space-y-6">
    <h3 className="text-lg font-black uppercase italic flex items-center gap-2 text-stone-700">
      <span className="text-rose-500">{icon}</span> {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const DetailItem = ({ label, value, isLocked = false }) => (
  <div className="flex justify-between border-b border-stone-50 pb-2">
    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
      {label}
    </span>
    <span
      className={`text-sm font-bold text-stone-700 italic ${isLocked ? "blur-sm select-none" : ""}`}
    >
      {isLocked ? "••••••••••••" : value || "N/A"}
    </span>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-[2.5rem] flex flex-col items-center gap-1 border border-stone-100 shadow-sm hover:bg-rose-50 transition-colors">
    <div className="text-rose-500 mb-1">{icon}</div>
    <span className="text-[9px] font-black uppercase text-stone-400 tracking-widest">
      {label}
    </span>
    <span className="text-sm font-black text-stone-800 tracking-tight">
      {value || "N/A"}
    </span>
  </div>
);

const ContactInfo = ({ icon, label, value, isPremiumUser, isLoggedIn }) => (
  <div
    className={`flex items-center gap-5 transition-all duration-1000 ${!isLoggedIn || !isPremiumUser ? "blur-md opacity-20 scale-90" : "blur-0 opacity-100 scale-100"}`}
  >
    <div className="p-5 bg-rose-50 rounded-3xl text-rose-500 shadow-sm">
      {icon}
    </div>
    <div className="text-left">
      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="font-bold text-xl text-stone-800 tracking-tighter">
        {value}
      </p>
    </div>
  </div>
);

export default FindYourMatchDetail;
