import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userUpdate } from "../features/admin/adminSlice";

export default function EditUserModal({ user, handleModel }) {
    // Initialize state with current user credits when modal opens
    const [credits, setCredits] = useState(user?.credits || 0);
    const dispatch = useDispatch();

    // Update local state if the user prop changes
    useEffect(() => {
        if (user) setCredits(user.credits);
    }, [user]);

    const handleCreditupdate = (e) => {
        e.preventDefault(); // Fixed: added parentheses
        dispatch(userUpdate({ uid: user._id, credits }));
        handleModel(); // Close modal after update
    };

    if (!user) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            {/* BACKDROP - Added onClick here to close when clicking outside */}
            <div
                onClick={handleModel}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* MODAL */}
            <form
                onSubmit={handleCreditupdate}
                className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 shadow-xl p-6 animate-scaleIn"
            >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold text-white">Edit User</h2>
                    <button
                        type="button" // Important: prevents form submission
                        onClick={handleModel}
                        className="text-slate-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                {/* USER INFO */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">
                        {user?.name?.[0]?.toUpperCase()}
                    </div>

                    <div className="block">
                        <p className="text-white text-sm font-medium">User: {user?.name}</p>
                        <p className="text-slate-400 text-xs">{user?.email}</p>
                        <p className="text-slate-400 text-xs">Current: {user?.credits}</p>
                    </div>
                </div>

                {/* INPUT */}
                <div className="mb-5">
                    <label className="text-xs text-slate-400 block mb-2">
                        New Credit Balance
                    </label>
                    <input
                        type="number"
                        // Fixed: passed 'e' and used 'credits' state for value
                        onChange={(e) => setCredits(Number(e.target.value))}
                        value={credits}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-violet-500"
                    />
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">
                    <button
                        type="button" // Fixed: prevents submission
                        onClick={handleModel}
                        className="w-full py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}