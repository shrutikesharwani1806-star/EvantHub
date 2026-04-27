import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTickets } from "../features/order/orderSlice";
import { getProfile } from "../features/auth/authSlice"

export default function ProfilePage() {
  const { user, profileData, isError, message } = useSelector((state) => state.auth)
  const { orders, order, orderLoading, orderSuccess, orderError, orderErrorMessage } = useSelector(state => state.order)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const now = new Date();

 

  useEffect(() => {

    if(!isError){
      dispatch(getProfile(user._id))
    }

    if(!orderError){
      dispatch(getTickets())
    }

    if (!user) {
      navigate("/login")
    }

    if (user.isAdmin) {
      navigate("/admin")
    }

    if(isError && message || orderError && orderErrorMessage){
      toast.error(message || orderErrorMessage)
    }
  }, [user, navigate , message , orderError , orderErrorMessage , isError])

  const fullName = user?.name || "Guest User"
  const email = user?.email || "Not provided"
  const phone = user?.phone || "Not provided"
  const role = user?.isAdmin ? "Admin" : "Member"
  const status = user?.isActive ? "Active" : "Inactive"
  const initial = fullName.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 mb-8">
          <div className="h-40 sm:h-52 bg-gradient-to-r from-violet-600/30 via-fuchsia-600/20 to-indigo-600/30 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=40')] bg-cover bg-center opacity-20" />
          </div>
          <div className="px-6 sm:px-8 pb-8 -mt-16 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 border-4 border-slate-950 flex items-center justify-center text-white text-4xl font-extrabold shadow-xl">
                {initial}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-extrabold text-white">{fullName}</h1>
                <p className="text-slate-400 text-sm mt-1">{email}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
                    {role}
                  </span>
                  <span className="text-slate-500 text-xs">Status: {status}</span>
                </div>
              </div>
              <button className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25 mt-4 sm:mt-0">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h2 className="text-lg font-bold text-white mb-5">Personal Info</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Full Name</p>
                  <p className="text-white text-sm font-medium">{fullName}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Email</p>
                  <p className="text-white text-sm font-medium">{email}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-white text-sm font-medium">{phone}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Location</p>
                  <p className="text-white text-sm font-medium">Mumbai, India</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Date of Birth</p>
                  <p className="text-white text-sm font-medium">15 March 1995</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h2 className="text-lg font-bold text-white mb-5">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {["Music", "Tech", "Art", "Food", "Wellness"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h2 className="text-lg font-bold text-white mb-2">Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
                <div className="rounded-xl bg-white/5 border border-white/5 p-4 text-center">
                  <p className="text-2xl font-bold text-violet-400">{profileData?.events?.length} </p>
                  <p className="text-slate-400 text-xs mt-1">Events Attended</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/5 p-4 text-center">
                  <p className="text-2xl font-bold text-fuchsia-400">{profileData?.events?.length} </p>
                  <p className="text-slate-400 text-xs mt-1">Upcoming</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/5 p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-400">₹{profileData?.user?.credits}</p>
                  <p className="text-slate-400 text-xs mt-1">Total Credits</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/5 p-4 text-center">
                  <p className="text-2xl font-bold text-amber-400"> {profileData?.comments?.length} </p>
                  <p className="text-slate-400 text-xs mt-1">Reviews</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">Recent Tickets</h2>
                <Link
                  to="/my-tickets"
                  className="text-violet-400 text-sm hover:text-violet-300 transition-colors"
                >
                  View All →
                </Link>
              </div>
              <div className="space-y-3">
                {orders.slice(0, 3).map((order) => (
                  <div
                  onClick={() => navigate("/my-tickets")}
                    key={order._id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 flex items-center justify-center text-lg">
                        🎫
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{order.event.title}</p>
                        <p className="text-slate-400 text-xs">{new Date(order.createdAt).toLocaleDateString('en-IN')} · {order.event.eventLocation}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-violet-400 font-bold text-sm">{order.billedAmount}</p>
                      <span
                        className={`text-xs font-semibold ${order.status === "Confirmed"
                            ? "text-emerald-400"
                            : order.status === "Pending"
                              ? "text-amber-400"
                              : "text-red-400"
                          }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h2 className="text-lg font-bold text-white mb-5">Account Settings</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🔔</span>
                    <div>
                      <p className="text-white font-medium text-sm">Notifications</p>
                      <p className="text-slate-500 text-xs">Manage email & push preferences</p>
                    </div>
                  </div>
                  <span className="text-slate-500">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🔒</span>
                    <div>
                      <p className="text-white font-medium text-sm">Security</p>
                      <p className="text-slate-500 text-xs">Password & two-factor authentication</p>
                    </div>
                  </div>
                  <span className="text-slate-500">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">💳</span>
                    <div>
                      <p className="text-white font-medium text-sm">Payment Methods</p>
                      <p className="text-slate-500 text-xs">Manage saved cards & UPI</p>
                    </div>
                  </div>
                  <span className="text-slate-500">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
