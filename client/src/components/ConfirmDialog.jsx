export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = "Delete", confirmColor = "red" }) {
  if (!isOpen) return null;

  const btnColor = confirmColor === "red"
    ? "bg-red-500 hover:bg-red-600 shadow-red-500/25"
    : "bg-violet-600 hover:bg-violet-500 shadow-violet-500/25";

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog w-full max-w-sm mx-4 rounded-2xl bg-slate-900 border border-white/10 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-6">
          <div className={`w-14 h-14 mx-auto rounded-full ${confirmColor === "red" ? "bg-red-500/10" : "bg-violet-500/10"} flex items-center justify-center mb-4`}>
            <span className="text-2xl">{confirmColor === "red" ? "🗑️" : "⚡"}</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-slate-400 text-sm">{message}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 text-sm font-semibold text-slate-300 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 text-sm font-semibold text-white rounded-xl ${btnColor} shadow-lg transition-all duration-300`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
