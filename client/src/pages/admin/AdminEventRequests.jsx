import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../components/AdminHeader";
import CreateEventModal from "./CreateEventModal";
import RejectReasonModal from "./RejectReasonModal";
import { getAllEvents, updateEventAdmin } from "../../features/admin/adminSlice";

const STATUS_TABS = [
  { key: "all", label: "All Requests" },
  { key: "pending", label: "Pending", color: "bg-amber-500" },
  { key: "approved", label: "Approved", color: "bg-emerald-500" },
  { key: "rejected", label: "Rejected", color: "bg-red-500" },
];

const statusBadge = {
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  rejected: "bg-red-500/15 text-red-400 border-red-500/25",
};

export default function AdminEventRequests() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.admin);

  const [activeTab, setActiveTab] = useState("all");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const requestEvents = events || [];
  const pendingEvents = requestEvents.filter((e) => e.status === "pending");

  const filteredEvents =
    activeTab === "all"
      ? requestEvents
      : requestEvents.filter((e) => e.status === activeTab);

  const handleApprove = async (event) => {
    setLoadingAction(`approve-${event._id}`);
    const fd = new FormData();
    fd.append('_id', event._id);
    fd.append('status', 'approved');
    fd.append('rejectionReason', '');
    await dispatch(updateEventAdmin(fd));
    setLoadingAction(null);
  };

  const handleRejectOpen = (event) => {
    setRejectTarget(event);
    setRejectModalOpen(true);
  };

  const handleRejectConfirm = async (reason) => {
    if (!rejectTarget) return;
    setLoadingAction(`reject-${rejectTarget._id}`);
    setRejectModalOpen(false);
    const fd = new FormData();
    fd.append('_id', rejectTarget._id);
    fd.append('status', 'rejected');
    fd.append('rejectionReason', reason);
    await dispatch(updateEventAdmin(fd));
    setLoadingAction(null);
    setRejectTarget(null);
  };

  const handleEdit = (event) => {
    setEditTarget(event);
    setEditModalOpen(true);
  };

  const tabCounts = {
    all: requestEvents.length,
    pending: pendingEvents.length,
    approved: requestEvents.filter((e) => e.status === "approved").length,
    rejected: requestEvents.filter((e) => e.status === "rejected").length,
  };

  return (
    <div>
      <AdminHeader title="Event Requests" />
      <div className="p-6 space-y-6 page-transition">
        {/* Header Stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeInUp">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-3">
              Event Requests
              {pendingEvents.length > 0 && (
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-breathe">
                  {pendingEvents.length} pending
                </span>
              )}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Review and manage event submissions from users
            </p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 animate-fadeInUp delay-100">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.key
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                activeTab === tab.key ? "bg-violet-500/30 text-violet-300" : "bg-white/5 text-slate-500"
              }`}>
                {tabCounts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 animate-scaleFadeIn">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <span className="text-4xl">📋</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Event Requests</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              {activeTab === "pending"
                ? "There are no pending event requests to review."
                : activeTab === "rejected"
                ? "No events have been rejected yet."
                : activeTab === "approved"
                ? "No events have been approved yet."
                : "No event requests have been submitted yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredEvents.map((event, index) => (
              <div
                key={event._id}
                className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden card-hover animate-fadeInUp group"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={event.eventImage}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${statusBadge[event.status] || statusBadge.pending}`}>
                      {event.status?.charAt(0).toUpperCase() + event.status?.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-3 truncate group-hover:text-violet-300 transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="text-xs">📅</span>
                      <span>{event.eventDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="text-xs">📍</span>
                      <span className="truncate">{event.eventLocation}</span>
                    </div>
                    {event.eventArtistName && (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="text-xs">🎤</span>
                        <span>{event.eventArtistName}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-xs">💰</span>
                        <span className="text-violet-400 font-semibold">{event.ticketPrice}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="text-xs">💺</span>
                        <span>{event.totalSeats?.toLocaleString?.()} seats</span>
                      </div>
                    </div>
                  </div>

                  {/* Rejection Reason */}
                  {event.status === "rejected" && event.rejectionReason && (
                    <div className="rounded-lg bg-red-500/5 border border-red-500/15 p-3 mb-4">
                      <p className="text-red-400 text-xs font-medium mb-1">Rejection Reason:</p>
                      <p className="text-slate-400 text-xs">{event.rejectionReason}</p>
                    </div>
                  )}

                  {/* Actions */}
                  {event.status === "pending" && (
                    <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                      <button
                        onClick={() => handleApprove(event)}
                        disabled={loadingAction === `approve-${event._id}`}
                        className="flex-1 py-2 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-1.5"
                      >
                        {loadingAction === `approve-${event._id}` ? (
                          <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <>✅ Approve</>
                        )}
                      </button>
                      <button
                        onClick={() => handleRejectOpen(event)}
                        disabled={loadingAction === `reject-${event._id}`}
                        className="flex-1 py-2 text-xs font-semibold rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-1.5"
                      >
                        {loadingAction === `reject-${event._id}` ? (
                          <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <>❌ Reject</>
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(event)}
                        className="py-2 px-3 text-xs font-semibold rounded-lg bg-white/5 text-slate-300 border border-white/10 hover:bg-violet-600/20 hover:text-violet-300 hover:border-violet-500/30 transition-all duration-200"
                      >
                        ✏️
                      </button>
                    </div>
                  )}

                  {event.status === "approved" && (
                    <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                      <button
                        onClick={() => handleEdit(event)}
                        className="flex-1 py-2 text-xs font-semibold rounded-lg bg-white/5 text-slate-300 border border-white/10 hover:bg-violet-600/20 hover:text-violet-300 hover:border-violet-500/30 transition-all duration-200"
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  )}

                  {event.status === "rejected" && (
                    <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                      <button
                        onClick={() => handleApprove(event)}
                        disabled={loadingAction === `approve-${event._id}`}
                        className="flex-1 py-2 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-1.5"
                      >
                        ✅ Approve Instead
                      </button>
                      <button
                        onClick={() => handleEdit(event)}
                        className="py-2 px-3 text-xs font-semibold rounded-lg bg-white/5 text-slate-300 border border-white/10 hover:bg-violet-600/20 hover:text-violet-300 hover:border-violet-500/30 transition-all duration-200"
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal (reuses CreateEventModal) */}
      <CreateEventModal
        isOpen={editModalOpen}
        onClose={() => { setEditModalOpen(false); setEditTarget(null); }}
        editEvent={editTarget}
      />

      {/* Reject Reason Modal */}
      <RejectReasonModal
        isOpen={rejectModalOpen}
        onClose={() => { setRejectModalOpen(false); setRejectTarget(null); }}
        onConfirm={handleRejectConfirm}
        eventTitle={rejectTarget?.title || ""}
      />
    </div>
  );
}
