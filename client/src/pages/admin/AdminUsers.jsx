import { useState, useEffect } from "react";
import AdminHeader from "../../components/AdminHeader";
import TableUI from "../../components/TableUI";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, removeUser, userUpdate } from "../../features/admin/adminSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import UserEditModel from "../../components/UserEditModel"

function UserDetailModal({ user, isOpen, onClose }) {

  const { adminLoading, adminError, adminErrorMessage } = useSelector(state => state.admin)

  if (!isOpen || !user) return null;

  const roleColors = {
    Admin: "bg-violet-500/20 text-violet-400",
    User: "bg-sky-500/20 text-sky-400",
    Moderator: "bg-amber-500/20 text-amber-400",
  };

  const statusColors = {
    Active: "bg-emerald-500/20 text-emerald-400",
    Inactive: "bg-slate-500/20 text-slate-400",
  };


  useEffect(() => {
    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, { position: "top-center", theme: "dark" });
    }
  }, [adminError, adminErrorMessage]);

  if (adminLoading) {
    return (
      <Loader text="loading Admin Data..." />
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 shadow-2xl shadow-black/50 animate-scaleIn p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">User Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-2xl mb-4">
            {user.name[0]}
          </div>
          <h3 className="text-lg font-bold text-white">{user.name}</h3>
          <p className="text-slate-400 text-sm">{user.email}</p>
          <div className="flex gap-2 mt-3">
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${roleColors[user.phone]}`}>
              {user.phone}
            </span>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[user.isActive]}`}>
              {user.isActive}
            </span>
          </div>
        </div>

        <div className="space-y-3 rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">User ID</span>
            <span className="text-slate-300 font-mono">#{user._id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Joined</span>
            <span className="text-slate-300">{user.createdAt}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Role</span>
            <span className="text-slate-300">{user.phone}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Status</span>
            <span className="text-slate-300">{user.status}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25 btn-glow"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function AdminUsers() {
  const dispatch = useDispatch();
  const { users = [] } = useSelector((state) => state.admin);

  // FIXED: Track the specific user being edited, not just a boolean
  const [editingUser, setEditingUser] = useState(null);

  const handleBanUnbanUser = (update) => {
    dispatch(userUpdate(update));
  };

  const roleColors = {
    Admin: "bg-violet-500/20 text-violet-400",
    User: "bg-sky-500/20 text-sky-400",
    Moderator: "bg-amber-500/20 text-amber-400",
  };

  const statusColors = {
    Active: "bg-emerald-500/20 text-emerald-400",
    Inactive: "bg-slate-500/20 text-slate-400",
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <AdminHeader title="Users" />
      <div className="p-6 space-y-6 page-transition">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeInUp">
          <div>
            <h2 className="text-lg font-bold text-white">All Users</h2>
            <p className="text-slate-400 text-sm">{users.length} users registered</p>
          </div>
        </div>

        <div className="animate-fadeInUp delay-100">
          <TableUI
            columns={["Name", "Email", "Role", "Status", "Joined", "Actions"]}
            data={users}
            renderRow={(user, index) => (
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs">
                      {user.name[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-white font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${roleColors[user.role] || roleColors.User}`}>
                    {user.role || 'User'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${user.isActive ? statusColors.Active : statusColors.Inactive}`}>
                    {user.isActive ? "Active" : "Blocked"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">
                  {new Date(user.createdAt).toLocaleDateString('en-IN')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      // FIXED: Pass the specific user to the state
                      onClick={() => setEditingUser(user)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-500/10 text-gray-400 border border-gray-500/20 hover:bg-gray-500/20 transition-all"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleBanUnbanUser({ uid: user._id, isActive: !user.isActive })}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${user.isActive
                        ? "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                        : "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
                        }`}
                    >
                      {user.isActive ? 'Suspend' : 'Reactivate'}
                    </button>
                  </div>
                </td>
              </tr>
            )}
          />
        </div>
      </div>

      {/* FIXED: Render the modal ONCE outside the table loop */}
      {editingUser && (
        <UserEditModel
          user={editingUser}
          handleModel={() => setEditingUser(null)}
        />
      )}
    </div>
  );
}