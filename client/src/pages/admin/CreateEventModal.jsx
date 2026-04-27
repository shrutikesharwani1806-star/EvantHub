import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addEventAdmin, updateEventAdmin } from "../../features/admin/adminSlice";

export default function CreateEventModal({ isOpen, onClose, editEvent }) {

  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)

  const isEdit = !!editEvent;

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

  useEffect(() => {
    if (editEvent) {
      setFormData(editEvent);
    } else {
      setFormData({
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
      });
    }
  }, [editEvent]);
  const { title, description, category, eventImage, eventDate, eventLocation, eventArtistName, ticketPrice, totalSeats, duration, isActive, status } = formData

  const handleChange = (e) => {
    if (e.target.name === "eventImage") {
      const file = e.target.files[0]
      if (file) {
        console.log("File selected:", file)
        setFormData({ ...formData, eventImage: file })
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData()
    if (isEdit && formData._id) {
      formDataToSend.append('_id', formData._id);
    }
    formDataToSend.append('title', title)
    formDataToSend.append('description', description)
    formDataToSend.append('category', category)
    formDataToSend.append('eventDate', eventDate)
    formDataToSend.append('eventLocation', eventLocation)
    formDataToSend.append('eventArtistName', eventArtistName)
    formDataToSend.append('ticketPrice', ticketPrice)
    formDataToSend.append('totalSeats', totalSeats)
    formDataToSend.append('duration', duration)
    if (eventImage) {
      formDataToSend.append('eventImage', eventImage)
    }
    formDataToSend.append('isActive', isActive)
    formDataToSend.append('status', status)

    !isEdit ? dispatch(addEventAdmin(formDataToSend)) : dispatch(updateEventAdmin(formDataToSend))

  }



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose} />

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-white/10 shadow-2xl shadow-black/50 animate-scaleIn">
        <div className="sticky top-0 z-10 bg-slate-900 border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {isEdit ? "Edit Event" : "Create New Event"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">
                Event Image
              </label>
              <div className="relative rounded-xl border-2 border-dashed border-white/10 hover:border-violet-500/40 transition-all duration-300 bg-white/[0.02] p-8 text-center cursor-pointer group">
                <input
                  name="eventImage"
                  onChange={handleChange}
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

            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">
                Event Title
              </label>
              <input
                type="text"
                value={title}
                onChange={handleChange}
                name="title"
                placeholder="e.g. Sunburn Music Festival"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">
                  Price
                </label>
                <input
                  type="number"
                  value={ticketPrice}
                  onChange={handleChange}
                  name="ticketPrice"
                  placeholder="e.g. 2999"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={handleChange}
                  name="eventLocation"
                  placeholder="e.g. Goa, India"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">
                  Date
                </label>
                <input
                  type="text"
                  value={eventDate}
                  onChange={handleChange}
                  name="eventDate"
                  placeholder="e.g. 12 Dec 2025"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">
                  Time
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={handleChange}
                  name="duration"
                  placeholder="e.g. 4:00 PM – 2:00 AM"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">
                  Total Seats
                </label>
                <input
                  type="number"
                  value={totalSeats}
                  onChange={handleChange}
                  name="totalSeats"
                  placeholder="e.g. 5000"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">
                  Artist Name
                </label>
                <input
                  type="text"
                  value={eventArtistName}
                  onChange={handleChange}
                  name="eventArtistName"
                  placeholder="e.g. Percept Live"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors appearance-none"
                >
                  {["Music", "Tech", "Business", "Arts", "Sports", "Food", "Health"].map((cat) => (
                    <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">
                  IsActive
                </label>
                <select name="isActive" value={isActive} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors">
                  <option value="true" className="bg-slate-800 text-white">Active</option>
                  <option value="false" className="bg-slate-800 text-white">InActive</option>

                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">
                  Status
                </label>
                <select name="status" value={status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors">
                  <option value="upcoming" className="bg-slate-800 text-white">upComing</option>
                  <option value="onGoing" className="bg-slate-800 text-white">onGoing</option>
                  <option value="expired" className="bg-slate-800 text-white">expired</option>
                  <option value="cancelled" className="bg-slate-800 text-white">cancelled</option>

                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={handleChange}
                name="description"
                rows="4"
                placeholder="Write a compelling description for your event..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            <button
              onClick={onClose}
              className="flex-1 py-3 text-sm font-semibold text-slate-300 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25 btn-glow"
            >
              {isEdit ? "Update Event" : "Create Event"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
