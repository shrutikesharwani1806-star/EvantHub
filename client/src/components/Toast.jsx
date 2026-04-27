import { useApp } from "../context/AppContext";

const icons = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

const colors = {
  success: "from-emerald-500 to-green-500 border-emerald-500/30",
  error: "from-red-500 to-rose-500 border-red-500/30",
  info: "from-violet-500 to-fuchsia-500 border-violet-500/30",
};

const bgColors = {
  success: "bg-emerald-500/10",
  error: "bg-red-500/10",
  info: "bg-violet-500/10",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-toastIn flex items-center gap-3 px-5 py-3.5 rounded-xl ${bgColors[toast.type]} backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/30 cursor-pointer`}
          onClick={() => removeToast(toast.id)}
        >
          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${colors[toast.type]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
            {icons[toast.type]}
          </div>
          <p className="text-white text-sm font-medium">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
