import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-black text-sm">
                E
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                EventHub
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              EventHub helps you discover and book events based on your mood—making every moment more fun and personalized.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/events"
                  className="text-slate-400 text-sm hover:text-violet-400 transition-colors duration-200"
                >
                  All Events
                </Link>
              </li>
              <li>
                <Link
                  to="/my-tickets"
                  className="text-slate-400 text-sm hover:text-violet-400 transition-colors duration-200"
                >
                  My Tickets
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-slate-400 text-sm hover:text-violet-400 transition-colors duration-200"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-slate-400 text-sm cursor-pointer hover:text-violet-400 transition-colors duration-200">
                  About Us
                </span>
              </li>
              <li>
                <span className="text-slate-400 text-sm cursor-pointer hover:text-violet-400 transition-colors duration-200">
                  Careers
                </span>
              </li>
              <li>
                <span className="text-slate-400 text-sm cursor-pointer hover:text-violet-400 transition-colors duration-200">
                  Contact
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3">
              <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-violet-600/20 hover:text-violet-400 hover:border-violet-500/30 transition-all duration-300 cursor-pointer">
                𝕏
              </span>
              <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-violet-600/20 hover:text-violet-400 hover:border-violet-500/30 transition-all duration-300 cursor-pointer text-lg">
                ▶
              </span>
              <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-violet-600/20 hover:text-violet-400 hover:border-violet-500/30 transition-all duration-300 cursor-pointer text-lg">
                ◉
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2026 EventHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-slate-500 text-xs cursor-pointer hover:text-slate-300 transition-colors">
              Privacy Policy
            </span>
            <span className="text-slate-500 text-xs cursor-pointer hover:text-slate-300 transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
