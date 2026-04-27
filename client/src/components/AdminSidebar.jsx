import { Link, useLocation, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {logoutUser} from '../features/auth/authSlice.js'

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: "📊" },
  { label: "Events", path: "/admin/events", icon: "📅" },
  { label: "Requests", path: "/admin/requests", icon: "📩" },
  { label: "Ratings", path: "/admin/ratings", icon: "⭐" },
  { label: "Orders", path: "/admin/orders", icon: "🎫" },
  { label: "Users", path: "/admin/users", icon: "👥" },
  { label: "Coupons", path: "/admin/coupons", icon: "🏷️" },
];

export default function AdminSidebar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/")
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-950 border-r border-white/5 z-50 hidden lg:flex flex-col">
      <div className="p-6 border-b border-white/5">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-black text-sm">
            E
          </div>
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              EventHub
            </span>
            <p className="text-slate-500 text-xs -mt-0.5">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 animate-fadeInUp ${
                isActive
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <span className="text-lg">🌐</span>
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <span className="text-lg">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
