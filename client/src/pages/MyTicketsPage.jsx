import { useDispatch, useSelector } from "react-redux";
import TicketCard from "../components/TicketCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTickets } from "../features/order/orderSlice";
import Loader from "../components/Loader";

export default function MyTicketsPage() {
  const { orders, orderLoading, orderError, orderErrorMessage } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filter, setFilter] = useState("All");

  const statusColors = {
    confirmed: "bg-emerald-500/20 text-emerald-400",
    pending: "bg-amber-500/20 text-amber-400",
    cancelled: "bg-red-500/20 text-red-400",
    expired: "bg-slate-500/20 text-slate-400",
  };

  const filters = ["All", "confirmed", "pending", "cancelled", "expired"];
  const filteredOrders = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }

    dispatch(getTickets())
  }, [user, orderError, orderErrorMessage, navigate, dispatch])

  if (orderLoading){
    return(
      <Loader text="Loading your tickets..." />
    )
  }
  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Your Bookings
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            My Tickets
          </h1>
        </div>

        <div className="flex gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                filter === f
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                  : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <TicketCard key={order._id || order.id} order={order} />
          ))}
        </div>

        {filteredOrders.length === 0 && user && (
          <div className="text-center py-20">
            <p className="text-slate-300 text-xl font-semibold mb-3">
              You don&apos;t have any bookings yet.
            </p>
            <p className="text-slate-500 text-sm">
              Browse events and book your first ticket to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
