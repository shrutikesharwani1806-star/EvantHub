import { useState } from "react";
import { useDispatch } from "react-redux";
import { ticketCancel } from "../features/order/orderSlice";

export default function TicketCard({ order, onCancel }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch()

  const statusColors = {
    Confirmed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const eventTitle = order.event?.title || order.title;
  const location = order.event?.eventLocation || order.location;
  const date = order.event?.eventDate || order.date;
  const ticketType = order.paymentMethod === "upi" ? "UPI" : order.ticketType || "General";
  const quantity = order.seats || order.quantity || 1;
  const total = order.billedAmount ? `₹${order.billedAmount}` : order.total;
  const ticketId = order._id || order.id;
  const status = order.status || "Pending";

  const handleCancelTicket = (tid) => {
    dispatch(ticketCancel(tid))
  };

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-violet-500/10 transition-all duration-500 hover:-translate-y-1">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

        <div className="p-6">
          <div className="flex items-start justify-between mb-4 gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                {eventTitle}
              </h3>
              <p className="text-slate-400 text-sm flex items-center gap-1">
                <span>📍</span> {location}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[status] || statusColors.Pending
                }`}
            >
              {status}
            </span>
          </div>

          <div className="border-t border-dashed border-white/10 my-4 relative">
            <div className="absolute -left-9 -top-3 w-6 h-6 rounded-full bg-slate-950" />
            <div className="absolute -right-9 -top-3 w-6 h-6 rounded-full bg-slate-950" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-slate-500 text-xs mb-1">Date</p>
              <p className="text-white text-sm font-medium">{date}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Type</p>
              <p className="text-white text-sm font-medium">
                {ticketType}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">
                Number of seats
              </p>
              <p className="text-white text-sm font-medium">
                {quantity}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Total</p>
              <p className="text-violet-400 text-lg font-bold">
                {total}
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between pt-4 border-t border-white/5 gap-4">
            <div>
              <p className="text-slate-500 text-xs">Ticket ID</p>
              <p className="text-slate-300 text-xs font-mono break-all">
                {ticketId}
              </p>
            </div>

            {
              order.status === "confirmed" && <button
                onClick={() => setShowConfirm(true)}
                className="px-4 py-2 rounded-xl bg-red-500/10 text-red-200 border border-red-500/20 text-sm font-semibold hover:bg-red-500/20 transition-all duration-300"
              >
                Cancel Ticket
              </button>
            }
          </div>
        </div>
      </div>

      {/* ✅ Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
            <h2 className="text-white text-lg font-bold mb-3">
              Cancel Ticket
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Are you sure you want to cancel this ticket?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10"
              >
                No
              </button>
              <button
                onClick={() => handleCancelTicket(order._id)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}