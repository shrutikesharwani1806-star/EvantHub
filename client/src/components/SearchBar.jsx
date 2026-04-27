export default function SearchBar() {
  return (
    <div className="relative max-w-xl w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span className="text-slate-400 text-lg">🔍</span>
      </div>
      <input
        type="text"
        placeholder="Search events, locations, categories..."
        readOnly
        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all duration-300"
      />
    </div>
  );
}
