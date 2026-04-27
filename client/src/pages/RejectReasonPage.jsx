import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../utils/axiosInstance";
import Loader from "../components/Loader";

export default function RejectReasonPage() {
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/api/events/my-requests', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const req = res.data.find(r => r._id === id);
        setRequest(req);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchRequests();
    else setLoading(false);
  }, [id, user]);

  if (loading) return <Loader />;

  if (!request) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-20">
        <div className="max-w-xl w-full rounded-3xl bg-white/5 border border-white/10 p-10 text-center">
          <h1 className="text-3xl font-bold mb-4">Request not found</h1>
          <p className="text-slate-400 mb-8">
            We could not find the event request you are looking for. Please verify the link or submit a new request.
          </p>
          <Link
            to="/create-event"
            className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300"
          >
            Submit New Event
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-violet-400 text-sm uppercase tracking-widest mb-2">Request Status</p>
              <h1 className="text-3xl font-extrabold text-white">{request.title}</h1>
              <p className="text-slate-400 mt-2">Track the current status of your event request.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-xs font-semibold ${
                request.status === "approved"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                  : request.status === "rejected"
                  ? "bg-red-500/15 text-red-400 border border-red-500/25"
                  : "bg-amber-500/15 text-amber-400 border border-amber-500/25"
              }`}>
                {request.status?.charAt(0).toUpperCase() + request.status?.slice(1)}
              </span>
              <Link
                to="/create-event"
                className="px-4 py-2 rounded-full bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-all duration-300"
              >
                New Request
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-3xl bg-slate-950/80 border border-white/10 p-6">
              <img
                src={request.eventImage}
                alt={request.title}
                className="w-full h-72 rounded-3xl object-cover mb-6"
              />
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-2">Event Details</h2>
                  <p className="text-slate-400 text-sm leading-relaxed">{request.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Date & Time</p>
                    <p className="text-white font-semibold">{request.eventDate} {request.duration}</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Location</p>
                    <p className="text-white font-semibold">{request.eventLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300 mb-2">Artist / Organizer</h3>
                <p className="text-white">{request.eventArtistName || "Self-organized"}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300 mb-2">Price</h3>
                <p className="text-white">₹{request.ticketPrice}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300 mb-2">Total Seats</h3>
                <p className="text-white">{request.totalSeats || "N/A"}</p>
              </div>
              {request.status === "rejected" && (
                <div className="rounded-3xl bg-red-500/10 border border-red-500/20 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-red-300 mb-2">Rejection Reason</h3>
                  <p className="text-slate-300 text-sm">{request.rejectionReason || "No reason provided."}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
