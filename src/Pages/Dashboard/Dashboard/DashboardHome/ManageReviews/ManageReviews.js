import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import sealImg from "../../../../../Images/sealwp.png";
import signImg from "../../../../../Images/signwp.png";
import {
  Trash2,
  Loader2,
  Star,
  MessageSquare,
  Calendar,
  Clock,
  Mail,
  Filter,
  FileText,
  Search,
  Pin,
  PinOff,
  Eye,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

// jsPDF and AutoTable imports
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ManageReviews = () => {
  const [filterRating, setFilterRating] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/reviews");
      if (!res.ok) throw new Error("Failed to load reviews");
      return res.json();
    },
    refetchInterval: 10000,
  });

  // 1. Pin/Unpin logic
  const handlePinReview = (id, currentStatus) => {
    const newStatus = !currentStatus;

    fetch(`http://localhost:5000/reviews/pin/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ isPinned: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: newStatus ? "Pinned to Home!" : "Removed from Home!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            background: "#1A1D1F",
            color: "#fff",
          });
          refetch();
        }
      });
  };

  // 2. PDF Download (Untouched as requested)
  const downloadPDF = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;

      doc.setFillColor(26, 29, 31);
      doc.rect(0, 0, pageWidth, 40, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("WEDDING PLANNER", 14, 25);
      doc.setFontSize(10);
      doc.text("OFFICIAL REVIEW INTELLIGENCE REPORT", 14, 33);

      doc.setTextColor(26, 29, 31);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Executive Summary", 14, 50);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Total Records: ${reviews.length}`, 14, 58);
      doc.text(`Average Platform Rating: ${avgRating} / 5.0`, 14, 64);
      doc.text(`Generation Date: ${new Date().toLocaleString()}`, 14, 70);

      const tableColumn = ["#", "Reviewer", "Email", "Rating", "Status"];
      const tableRows = filteredReviews.map((rev, index) => [
        index + 1,
        rev.name || rev.userName || "Anonymous",
        rev.email || rev.userEmail || "N/A",
        `${rev.star || rev.rating || 0} Stars`,
        rev.isPinned ? "Pinned (Featured)" : "Standard",
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 80,
        theme: "striped",
        headStyles: { fillColor: [26, 29, 31], fontSize: 10 },
        styles: { fontSize: 9, cellPadding: 3 },
      });

      const finalY = doc.lastAutoTable.finalY + 15;

      doc.addImage(signImg, "PNG", 14, finalY, 40, 15);
      doc.setFontSize(10);
      doc.setDrawColor(200);
      doc.line(14, finalY + 16, 70, finalY + 16);
      doc.text("Authorized Signature", 14, finalY + 22);

      doc.addImage(sealImg, "PNG", pageWidth - 50, finalY, 30, 30);
      doc.save(`Official_Planner_Report_${Date.now()}.pdf`);
    } catch (error) {
      console.error("PDF Export Error:", error);
      Swal.fire("Error", "Not Able to PDF Generate", "error");
    }
  };

  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (
          reviews.reduce(
            (acc, curr) =>
              acc + (Number(curr.star) || Number(curr.rating) || 0),
            0,
          ) / totalReviews
        ).toFixed(1)
      : 0;

  const filteredReviews = reviews.filter((rev) => {
    const matchesRating =
      filterRating === "all" ||
      (Number(rev.star) || Number(rev.rating)) === Number(filterRating);
    const matchesSearch =
      (rev.email || rev.userEmail || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (rev.name || rev.userName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const formatDateTime = (dateStr) => {
    if (!dateStr) return { date: "N/A", time: "N/A" };
    const dateObj = new Date(dateStr);
    return {
      date: dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const handleDeleteReview = (id) => {
    Swal.fire({
      title: "Confirm Deletion?",
      text: "This feedback will be removed permanently.",
      html: `
        <style>
          .swal2-confirm { background-color: #1A1D1F !important; transition: 0.3s; border-radius: 15px !important; }
          .swal2-confirm:hover { background-color: #db2777 !important; }
          .swal2-cancel { background-color: #f3f4f6 !important; color: #4b5563 !important; transition: 0.3s; border-radius: 15px !important; }
          .swal2-cancel:hover { background-color: #db2777 !important; color: white !important; }
        </style>
        This record will be permanently removed from admin logs.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, Keep it",
      customClass: { popup: "rounded-[40px]" },
    })

      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/reviews/${id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                Swal.fire({
                  title: "Removed!",
                  text: "Database updated.",
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false,
                  background: "#1A1D1F",
                  color: "#fff",
                });

                refetch();
              }
            });
        }
      });
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );

  return (
    <div className="p-4 md:p-10  min-h-screen">
      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard
          label="Total Feedback"
          value={totalReviews}
          icon={<MessageSquare />}
          color="blue"
        />
        <StatCard
          label="Avg. Rating"
          value={`${avgRating} / 5.0`}
          icon={<Star fill="currentColor" />}
          color="yellow"
        />
        <div className="bg-[#1A1D1F] p-6 rounded-[32px] text-white flex flex-col justify-between shadow-2xl sm:col-span-2 lg:col-span-1">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
            Export Tools
          </p>
          <button
            onClick={downloadPDF}
            className="flex items-center justify-center gap-2 bg-white text-black py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all text-sm mt-4"
          >
            <FileText size={18} /> Download Official PDF
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="input input-bordered w-full pl-12 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 bg-gray-50 p-2 px-4 rounded-2xl border border-gray-100">
          <Filter size={18} className="text-gray-400" />
          <select
            className="bg-transparent font-bold text-sm focus:outline-none cursor-pointer"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="all">All Ratings</option>
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>
                {num} Stars
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* --- DESKTOP TABLE VIEW --- */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-[40px] shadow-sm border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50/50 text-gray-400 uppercase text-[10px] tracking-widest font-black">
              <th className="py-6 pl-8">#</th>
              <th>Reviewer</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Posted On</th>
              <th className="text-center">Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((rev, index) => {
              const { date, time } = formatDateTime(rev.date);
              const rating = Number(rev.star) || Number(rev.rating) || 0;
              return (
                <tr
                  key={rev._id}
                  className={`hover:bg-gray-50/50 transition-all border-b border-gray-50 ${rev.isPinned ? "bg-yellow-50/30" : ""}`}
                >
                  <th className="pl-8 text-gray-400 font-medium">
                    {index + 1}
                  </th>
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 bg-gray-100">
                          <img
                            src={
                              rev.image || "https://i.ibb.co/5GzXkwq/user.png"
                            }
                            alt="User"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-[#1A1D1F] text-sm capitalize">
                          {rev.name || rev.userName || "Anonymous"}
                        </div>
                        <div className="text-[11px] text-gray-400 flex items-center gap-1 font-mono">
                          <Mail size={10} /> {rev.email || rev.userEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={
                            i < rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedReview(rev)}
                      className="flex items-center gap-2 text-primary font-bold text-xs hover:underline bg-primary/5 px-3 py-1.5 rounded-lg"
                    >
                      <Eye size={14} /> Read Feedback
                    </button>
                  </td>
                  <td>
                    <div className="text-xs font-bold text-[#1A1D1F] flex items-center gap-2">
                      <Calendar size={13} className="text-primary" /> {date}
                    </div>
                    <div className="text-[10px] text-gray-400 flex items-center gap-2 mt-1">
                      <Clock size={11} /> {time}
                    </div>
                  </td>
                  <td className="text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handlePinReview(rev._id, rev.isPinned)}
                        className={`btn btn-ghost btn-sm rounded-xl transition-all ${rev.isPinned ? "text-yellow-500 bg-yellow-50" : "text-gray-300 hover:text-yellow-500"}`}
                      >
                        {rev.isPinned ? (
                          <Pin size={18} fill="currentColor" />
                        ) : (
                          <PinOff size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteReview(rev._id)}
                        className="btn btn-ghost btn-sm text-red-400 hover:bg-red-50 rounded-xl transition-transform active:scale-95"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* --- GORGEOUS MOBILE CARD VIEW --- */}
      <div className="md:hidden space-y-4">
        {filteredReviews.map((rev) => {
          const { date } = formatDateTime(rev.date);
          const rating = Number(rev.star) || Number(rev.rating) || 0;
          return (
            <div
              key={rev._id}
              className={`relative bg-white rounded-[32px] p-5 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform ${rev.isPinned ? "ring-2 ring-yellow-400/50" : ""}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="mask mask-squircle w-16 h-16 bg-gray-100 border border-gray-100">
                    <img
                      src={rev.image || "https://i.ibb.co/5GzXkwq/user.png"}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {rev.isPinned && (
                    <div className="absolute -top-1 -right-1 bg-yellow-400 text-white p-1 rounded-full shadow-md">
                      <Pin size={10} fill="currentColor" />
                    </div>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-bold text-[#1A1D1F] truncate text-base">
                    {rev.name || rev.userName || "Anonymous"}
                  </h3>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 font-medium">
                    {date}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedReview(rev)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 h-10 rounded-xl font-bold text-xs transition-colors"
                >
                  <Eye size={14} /> Insight
                </button>
                <button
                  onClick={() => handlePinReview(rev._id, rev.isPinned)}
                  className={`w-12 h-10 flex items-center justify-center rounded-xl transition-all ${rev.isPinned ? "bg-yellow-400 text-white" : "bg-gray-50 text-gray-400"}`}
                >
                  {rev.isPinned ? (
                    <Pin size={16} fill="currentColor" />
                  ) : (
                    <PinOff size={16} />
                  )}
                </button>
                <button
                  onClick={() => handleDeleteReview(rev._id)}
                  className="w-12 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- View Feedback Modal --- */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600"
            >
              <X size={20} />
            </button>
            <div className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="avatar mb-4">
                  <div className="w-24 h-24 mask mask-squircle bg-gray-100">
                    <img
                      src={
                        selectedReview.image ||
                        "https://i.ibb.co/5GzXkwq/user.png"
                      }
                      alt="User"
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-black text-[#1A1D1F] capitalize">
                  {selectedReview.name}
                </h2>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < (selectedReview.star || selectedReview.rating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-[32px] italic text-gray-700 leading-relaxed text-center relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100 shadow-sm">
                  Client Feedback
                </span>
                "
                {selectedReview.description ||
                  selectedReview.reviewText ||
                  "No detailed feedback provided."}
                "
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setSelectedReview(null)}
                  className="btn btn-primary px-10 rounded-2xl shadow-lg shadow-primary/20 normal-case"
                >
                  Close Insight
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-5">
    <div
      className={`p-4 ${color === "blue" ? "bg-blue-50 text-blue-600" : "bg-yellow-50 text-yellow-600"} rounded-2xl`}
    >
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        {label}
      </p>
      <h2 className="text-2xl font-black text-[#1A1D1F]">{value}</h2>
    </div>
  </div>
);

export default ManageReviews;
