import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { categories } from "../mock/events";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEventAdmin } from "../features/admin/adminSlice";

export default function CreateEventRequestPage() {

  const [showSuccess, setShowSuccess] = useState(false);
  const [requestId, setRequestId] = useState(null);

  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { adminLoading, adminSuccess, adminError } = useSelector(state => state.admin)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Music",
    eventImage: "",
    eventDate: "",
    eventLocation: "",
    eventArtistName: "",
    ticketPrice: "",
    totalSeats: "",
    duration: "",
    isActive: true,
    status: "pending"
  })

  const { title, description, category, eventImage, eventDate, eventLocation, eventArtistName, ticketPrice, totalSeats, duration, isActive, status } = formData

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleImageChange = (e) => {
      const file = e.target.files[0]
      if (file) {
        setFormData({ ...formData, eventImage: file })
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData()
    formDataToSend.append('title', title)
    formDataToSend.append('description', description)
    formDataToSend.append('category', category)
    formDataToSend.append('eventDate', eventDate)
    formDataToSend.append('eventLocation', eventLocation)
    formDataToSend.append('eventArtistName', eventArtistName)
    formDataToSend.append('ticketPrice', ticketPrice)
    formDataToSend.append('totalSeats', totalSeats)
    formDataToSend.append('duration', duration)
    formDataToSend.append('eventImage', eventImage)
    formDataToSend.append('isActive', isActive)
    formDataToSend.append('status', status)

    try {
      const result = await dispatch(addEventAdmin(formDataToSend)).unwrap();
      if(result && result._id) setRequestId(result._id);
      setShowSuccess(true);
    } catch(err) {
      console.error(err);
    }
  }


  // ── Success Screen ──
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 pt-20 relative overflow-hidden">
        {/* 3D Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/90" />

        <div className="relative z-10 text-center max-w-md animate-scaleFadeIn">
          {/* Animated Checkmark */}
          <div className="relative mx-auto w-28 h-28 mb-8">
            <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ringExpand" />
            <div className="absolute inset-0 rounded-full bg-emerald-500/5 animate-ringExpand delay-300" />
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center animate-successPulse shadow-2xl shadow-emerald-500/30">
              <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" style={{ strokeDasharray: 100, animation: "checkDraw 0.8s ease-out 0.3s both" }} />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 animate-slideUp delay-200">
            Request Submitted!
          </h1>

          <div className="rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 mb-8 animate-slideUp delay-400 shadow-2xl">
            <div className="w-12 h-12 mx-auto rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
              <span className="text-2xl">⏳</span>
            </div>
            <p className="text-slate-300 text-base leading-relaxed">
              Thank you for submitting your response. Waiting for admin to approve your request.
            </p>
            <p className="text-slate-500 text-sm mt-3">
              You will be notified once the admin reviews your event.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 animate-slideUp delay-600">
            <Link
              to="/events"
              className="flex-1 py-3.5 text-sm font-semibold text-slate-300 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 text-center"
            >
              Browse Events
            </Link>
            {requestId && (
              <Link
                to={`/request-status/${requestId}`}
                className="flex-1 py-3.5 text-sm font-semibold text-white rounded-xl bg-violet-600/80 hover:bg-violet-500 transition-all duration-300 shadow-lg shadow-violet-500/25 text-center"
              >
                Track Request
              </Link>
            )}
            <button
              onClick={() => { setShowSuccess(false); setForm(initialForm); setImagePreview(null); setRequestId(null); }}
              className="flex-1 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25"
            >
              Submit Another Event
            </button>
          </div>
        </div>
      </div>
    );
  }




  // ── Form ──
  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20 relative overflow-hidden">
      {/* 3D Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-20 z-0"
        src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
      />
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90 z-0" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 animate-fadeInUp">
          <Link to="/events" className="text-violet-400 text-sm hover:text-violet-300 transition-colors mb-4 inline-block">
            ← Back to Events
          </Link>
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Host Your Event
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Create Event Request
          </h1>
          <p className="text-slate-400 text-base">
            Fill in the details below. Your event will be reviewed by our admin team before publishing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="animate-fadeInUp delay-100">
            <label className="block text-slate-400 text-sm font-medium mb-2">
              Event Image
            </label>
            <div className="relative rounded-xl border-2 border-dashed border-white/10 hover:border-violet-500/40 transition-all duration-300 bg-white/[0.02] p-8 text-center cursor-pointer group">
              <input
                name="eventImage"
                onChange={handleImageChange}
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {eventImage ? (
                <img
                  src={
                    eventImage
                      ? typeof eventImage === "string"
                        ? eventImage
                        : URL.createObjectURL(eventImage)
                      : ""
                  }
                  alt="Event"
                  className="w-full h-48 object-cover rounded-xl"
                />
              ) : (
                <div className="space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    📷
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="animate-fadeInUp delay-150">
            <label className="block text-slate-400 text-sm font-medium mb-2">
              Event Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g. Sunburn Music Festival"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all"
            />
          </div>

          {/* Category & Artist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeInUp delay-200">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50 transition-all appearance-none"
              >
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">
                Artist / Performer Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={eventArtistName}
                onChange={(e) => handleChange("eventArtistName", e.target.value)}
                placeholder="e.g. Arijit Singh"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>
          </div>

          {/* Location & Venue */}
          <div className=" animate-fadeInUp delay-250">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">
                Event Location <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => handleChange("eventLocation", e.target.value)}
                placeholder="e.g. Mumbai, India"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeInUp delay-300">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">
                Event Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => handleChange("eventDate", e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50 transition-all [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                placeholder="e.g. 6:00 PM – 10:00 PM"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>
          </div>

          {/* Price & Seats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeInUp delay-400">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">
                Ticket Price <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={ticketPrice}
                onChange={(e) => handleChange("ticketPrice", e.target.value)}
                placeholder="e.g. 999"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">
                Total Seats <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={totalSeats}
                onChange={(e) => handleChange("totalSeats", e.target.value)}
                placeholder="e.g. 500"
                required
                min="1"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">
                IsActive
              </label>
              <select name="isActive" value={isActive} onChange={(e) => handleChange(e.target.name, e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors">
                <option value="true" className="bg-slate-800 text-white">Active</option>
                <option value="false" className="bg-slate-800 text-white">InActive</option>

              </select>
            </div>
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">
                Status
              </label>
              <select name="status" value={status} onChange={(e) => handleChange(e.target.name, e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors">
                <option value="pending" className="bg-slate-800 text-white">Pending</option>
                <option value="upcoming" className="bg-slate-800 text-white">upComing</option>
                <option value="onGoing" className="bg-slate-800 text-white">onGoing</option>
                <option value="expired" className="bg-slate-800 text-white">expired</option>
                <option value="cancelled" className="bg-slate-800 text-white">cancelled</option>

              </select>
            </div>
          </div>




          {/* Description */}
          <div className="animate-fadeInUp delay-600">
            <label className="block text-slate-400 text-sm font-medium mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              rows="5"
              value={description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Write a compelling description for your event..."
              required
              className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-all resize-none"
            />
          </div>

          {/* Info Banner */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 flex items-start gap-3 animate-fadeInUp delay-700">
            <span className="text-amber-400 text-lg mt-0.5">ℹ️</span>
            <div>
              <p className="text-amber-300 text-sm font-medium">Event Review Process</p>
              <p className="text-slate-400 text-xs mt-1">Your event will be reviewed by our admin team. Once approved, it will be visible to all users on EventHub.</p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-4 animate-fadeInUp delay-800">
            <Link
              to="/events"
              className="flex-1 py-3.5 text-sm font-semibold text-slate-300 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"

              className="flex-1 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25 btn-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >

              "Submit Event Request"

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
