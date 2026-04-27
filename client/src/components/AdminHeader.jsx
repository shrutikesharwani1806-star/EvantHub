import { useSelector } from "react-redux";


export default function AdminHeader({ title }) {

  const {user} = useSelector(state => state.auth)


  return (
    <header className="h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold text-white">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            readOnly
            className="w-56 pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
            🔍
          </span>
        </div>
        <span className="text-slate-400 text-xl cursor-pointer hover:text-white transition-colors">
          🔔
        </span>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs">
           {user.name[0].toUpperCase()}
        </div>
      </div>
    </header>
  );
}
