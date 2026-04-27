import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";

export default function Navbar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/login")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-black text-sm">
              E
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              EventHub
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm text-slate-300 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-sm text-slate-300 hover:text-white transition-colors duration-200"
            >
              Events
            </Link>
            <Link
              to="/my-tickets"
              className="text-sm text-slate-300 hover:text-white transition-colors duration-200"
            >
              My Tickets
            </Link>
            <Link
              to="/create-event"
              className="text-sm text-slate-300 hover:text-white transition-colors duration-200"
            >
              Create Event
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {
              user ? (<>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 cursor-pointer text-sm font-semibold text-white rounded-xl bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-lg shadow-violet-500/25"
                >
                  Logout
                </button>
                <Link
                  to="/profile"
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs hover:scale-110 transition-transform duration-300 ml-1"
                >
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </Link></>) : (<>
                  <Link
                    to="/login"
                    className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25"
                  >
                    Get Started
                  </Link></>)
            }
          </div>

          <div className="md:hidden flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/create-event"
                  className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-violet-600 hover:bg-violet-500 transition-all duration-200 text-center"
                >
                  Create Event
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
