//!!!
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
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
  PartyPopper,
} from "lucide-react";

const FindYourMatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  // এই স্টেটটি ডাটাবেজ থেকে চেক করে সেট হবে
  const [isUnlockedInDb, setIsUnlockedInDb] = useState(false);

  const currentUserEmail = localStorage.getItem("userEmail");
  const isLoggedIn = !!currentUserEmail;

  // ফাইনাল কন্ডিশন: যদি পারসন প্রিমিয়াম হয় অথবা ডাটাবেজে আনলকড হিস্ট্রি থাকে
  const isPremiumUser = person?.isPremium === true || isUnlockedInDb;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // ১. বায়োডাটা ডিটেইল ফেচ করা
        const personRes = await fetch(`http://localhost:5000/biodata/${id}`);
        const personData = await personRes.json();
        setPerson(personData);

        // ২. ডাটাবেজে এই ইউজারের জন্য এই প্রোফাইলটি আনলকড কি না তা চেক করা
        if (currentUserEmail) {
          const unlockRes = await fetch(
            `http://localhost:5000/unlocked-requests/${currentUserEmail.toLowerCase()}`,
          );
          const unlockedList = await unlockRes.json();

          // যদি লিস্টে এই প্রোফাইলের আইডি খুঁজে পাওয়া যায়
          const alreadyUnlocked = unlockedList.some(
            (item) => item.biodataId === id,
          );
          setIsUnlockedInDb(alreadyUnlocked);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentUserEmail]);

  const profileImage = Array.isArray(person?.image)
    ? person?.image[0]?.url
    : person?.image;

  const handlePremiumClick = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const unlockData = {
      userEmail: currentUserEmail,
      biodataId: person?._id,
      biodataName: person?.name,
      biodataImage: profileImage,
      biodataAddress: person?.address,
    };

    const response = await fetch("http://localhost:5000/unlock-premium", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(unlockData),
    });

    const result = await response.json();

    if (response.ok) {
      setIsUnlockedInDb(true); // সরাসরি স্টেট আপডেট করুন
      triggerConfetti();
    } else {
      alert(result.message);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 1000,
    });
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center animate-pulse text-rose-500 font-bold">
        VERIFYING ACCESS...
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full z-50 p-8 flex justify-between items-center pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          className="pointer-events-auto bg-white p-4 rounded-full shadow-xl mt-20 active:scale-90 transition-transform"
        >
          <ArrowLeft size={20} />
        </button>
      </nav>

      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Column */}
        <aside className="w-full lg:w-[45%] h-[60vh] lg:h-full relative overflow-hidden bg-stone-900">
          <img
            src={profileImage}
            className={`w-full h-full object-cover transition-all duration-[3000ms] ${isPremiumUser ? "scale-110 brightness-110" : "scale-100 brightness-75 blur-[2px]"}`}
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 text-white text-left">
            <div className="flex items-center gap-2 mb-2">
              {isPremiumUser && (
                <Sparkles className="text-yellow-400 animate-pulse" size={20} />
              )}
              <span className="text-[10px] bg-rose-500 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                Verified Profile
              </span>
            </div>
            <h1 className="text-6xl font-black uppercase italic italic leading-tight">
              {person?.name}
            </h1>
            <p className="flex items-center gap-2 text-rose-300 font-bold mt-2">
              <MapPin size={18} /> {person?.address}
            </p>
          </div>
        </aside>

        {/* Right Column */}
        <main className="w-full lg:w-[55%] p-10 lg:p-20 overflow-y-auto bg-white rounded-t-[50px] lg:rounded-none -mt-10 lg:mt-0 z-10 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 text-left">
            <StatCard icon={<Calendar />} label="Age" value={person?.age} />
            <StatCard
              icon={<User />}
              label="Complexion"
              value={person?.physicalAttributes?.bodyColor}
            />
            <StatCard
              icon={<Users />}
              label="Religion"
              value={person?.religion}
            />
            <StatCard icon={<Award />} label="Rating" value={person?.rating} />
          </div>

          <section
            className={`p-12 rounded-[40px] transition-all duration-1000 border ${isPremiumUser ? "bg-stone-900 text-white border-stone-800" : "bg-stone-50 text-stone-800 border-stone-100"}`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-left">
                <h3 className="text-3xl font-black italic">
                  {isPremiumUser
                    ? "Full Access Granted"
                    : "Contact Details Locked"}
                </h3>
                <p className="opacity-60 text-xs font-bold uppercase mt-1 tracking-widest">
                  {isPremiumUser
                    ? "You can now see private contact information."
                    : "Premium required to view family & phone number."}
                </p>
              </div>
              {!isPremiumUser && (
                <button
                  onClick={handlePremiumClick}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 active:scale-95 shadow-lg transition-all"
                >
                  <Lock size={14} /> Unlock Now
                </button>
              )}
            </div>
          </section>

          {/* Contact Details with Dynamic Reveal */}
          <div className="mt-12 flex flex-col md:flex-row gap-10 justify-center pb-20">
            <div
              className={`flex items-center gap-4 transition-all duration-1000 ${!isPremiumUser ? "blur-md opacity-20 scale-90" : "blur-0 opacity-100 scale-100"}`}
            >
              <div className="p-4 bg-rose-50 rounded-2xl">
                <Mail className="text-rose-500" size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                  Email Address
                </p>
                <p className="font-bold text-lg text-stone-800">
                  {isPremiumUser ? person?.email : "hidden@mail.com"}
                </p>
              </div>
            </div>
            <div
              className={`flex items-center gap-4 transition-all duration-1000 ${!isPremiumUser ? "blur-md opacity-20 scale-90" : "blur-0 opacity-100 scale-100"}`}
            >
              <div className="p-4 bg-rose-50 rounded-2xl">
                <Phone className="text-rose-500" size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                  Phone Number
                </p>
                <p className="font-bold text-lg text-stone-800">
                  {isPremiumUser ? person?.contact : "+880 17XX-XXXXXX"}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-rose-50/50 p-6 rounded-[2.2rem] flex flex-col items-center gap-1 border border-rose-100 shadow-sm hover:bg-rose-50 transition-colors">
    <div className="text-rose-500 mb-1">{icon}</div>
    <span className="text-[9px] font-black uppercase text-stone-400 tracking-widest">
      {label}
    </span>
    <span className="text-sm font-black text-stone-800 tracking-tight">
      {value || "N/A"}
    </span>
  </div>
);

export default FindYourMatchDetail;
