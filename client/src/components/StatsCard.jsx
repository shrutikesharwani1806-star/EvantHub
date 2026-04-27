export default function StatsCard({ stat }) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{stat.icon}</span>
        <span className="text-emerald-400 text-xs font-semibold bg-emerald-400/10 px-2.5 py-1 rounded-full">
          {stat.change}
        </span>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
      <p className="text-slate-400 text-sm">{stat.label}</p>
    </div>
  );
}
