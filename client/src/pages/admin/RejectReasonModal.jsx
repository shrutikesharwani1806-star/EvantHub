import { useState } from "react";

export default function RejectReasonModal({ isOpen, onClose, onConfirm, eventTitle }) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleConfirm = (withReason) => {
    onConfirm(withReason ? reason : "");
    setReason("");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" />

      <div
        className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 shadow-2xl shadow-black/50 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Reject Event</h3>
            <p className="text-slate-400 text-sm">
              Are you sure you want to reject{" "}
              <span className="text-white font-medium">"{eventTitle}"</span>?
            </p>
          </div>

          {/* Reason Input */}
          <div className="mb-6">
            <label className="block text-slate-400 text-sm font-medium mb-2">
              Rejection Reason <span className="text-slate-600">(optional)</span>
            </label>
            <textarea
              rows="3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tell the organizer why this event was rejected..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500/50 transition-colors resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {reason.trim() ? (
              <button
                onClick={() => handleConfirm(true)}
                className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25 transition-all duration-300"
              >
                Reject with Reason
              </button>
            ) : (
              <button
                onClick={() => handleConfirm(false)}
                className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25 transition-all duration-300"
              >
                Reject Without Reason
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full py-2.5 text-sm font-semibold text-slate-300 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
