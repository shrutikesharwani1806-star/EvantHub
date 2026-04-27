import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import AdminHeader from "../../components/AdminHeader";
import { getAllUsers } from "../../features/admin/adminSlice";

export default function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users = [], adminLoading, adminError, adminErrorMessage } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!users.length) {
      dispatch(getAllUsers());
    }
  }, [dispatch, users.length]);

  const user = useMemo(
    () => users.find((item) => String(item._id || item.id) === String(id)),
    [users, id]
  );

  if (adminLoading) {
    return <Loader text="Loading user details..." />;
  }

  if (adminError || !user) {
    return (
      <div className="min-h-screen bg-slate-950 pt-28 pb-20 flex items-center justify-center px-4">
        <div className="max-w-xl w-full rounded-3xl bg-white/5 border border-white/10 p-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Unable to load user</h1>
          <p className="text-slate-400 mb-6">{adminErrorMessage || "The selected user could not be found."}</p>
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="inline-flex px-6 py-3 rounded-2xl bg-violet-600 text-white font-semibold hover:bg-violet-500 transition-colors"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="User Details" />
      <div className="p-6 space-y-6 page-transition">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeInUp">
          <div>
            <h2 className="text-3xl font-extrabold text-white">{user.name}</h2>
            <p className="text-slate-400 text-sm">Full profile for user record.</p>
          </div>
          <Link
            to="/admin/users"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-200 text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            ← Back to Users
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 rounded-3xl bg-white/5 border border-white/10 p-6 space-y-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-4xl font-bold">
                {user.name?.[0] || "U"}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{user.name}</h3>
                <p className="text-slate-400 text-sm">{user.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-4">
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-2">Role</p>
                <p className="text-white font-semibold">{user.role || "User"}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-4">
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-2">Status</p>
                <p className="text-white font-semibold">{user.status || "Active"}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-3xl bg-white/5 border border-white/10 p-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-4">
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-2">User ID</p>
                <p className="text-white font-semibold">{user._id || user.id}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-4">
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-2">Joined</p>
                <p className="text-white font-semibold">{user.joined || "N/A"}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-4">
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-2">Email</p>
                <p className="text-white font-semibold">{user.email}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-4">
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-2">Phone</p>
                <p className="text-white font-semibold">{user.phone || "Not provided"}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-4">
              <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-2">About</p>
              <p className="text-slate-300 text-sm leading-relaxed">{user.bio || "No description available."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
