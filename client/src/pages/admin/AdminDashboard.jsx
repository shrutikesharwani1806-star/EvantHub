import AdminHeader from "../../components/AdminHeader";
import StatsCard from "../../components/StatsCard";
import TableUI from "../../components/TableUI";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoupons, getAllEvents, getAllOrders, getAllRatings, getAllUsers } from "../../features/admin/adminSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

export default function AdminDashboard() {

  const { users , events , orders , ratings , adminLoading , adminSuccess , adminError , adminErrorMessage } = useSelector(state => state.admin)

  const dispatch = useDispatch()
  // const { orders } = useApp();

  const statusColors = {
    Completed: "bg-emerald-500/20 text-emerald-400",
    Pending: "bg-amber-500/20 text-amber-400",
    Refunded: "bg-red-500/20 text-red-400",
  };

  const { totalReviews, overallAverageRating, topRatedEvent, reviewedEvents } = useMemo(() => {
    const totalReviews = ratings.reduce((sum, group) => sum + (group.totalReviews || 0), 0);
    const weightedSum = ratings.reduce(
      (sum, group) => sum + (group.averageRating || 0) * (group.totalReviews || 0),
      0
    );
    const overallAverageRating = totalReviews ? weightedSum / totalReviews : 0;
    const topRatedEvent = [...ratings].sort((a, b) => b.averageRating - a.averageRating)[0];
    return {
      totalReviews,
      overallAverageRating,
      topRatedEvent,
      reviewedEvents: ratings.length,
    };
  }, [ratings]);

  useEffect(() => {

    if (!adminError){
      //fetch Users
     dispatch(getAllUsers())
     //fetch Events
     dispatch(getAllEvents())
     //fetch orders
     dispatch(getAllOrders())
     //fetch ratings
     dispatch(getAllRatings())
     //fetch coupons
     dispatch(getAllCoupons())
    }

    if(adminError && adminErrorMessage){
      toast.error(adminErrorMessage , {position : "top-center" , theme : "dark"})
    }

  },[adminError, adminErrorMessage, dispatch])

  if (adminLoading){
    return(
      <Loader text="loading Admin Data..." />
    )
  }

  return (
    <div>
      <AdminHeader title="Dashboard" />
      <div className="p-6 space-y-8 page-transition">
        

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            {
              label: "Total Events",
              value: events.length.toString(),
              icon: "📅",
              change: "+12%",
            },
            {
              label: "Total Revenue",
              value: `₹${orders.reduce((sum, order) => sum + order.billedAmount, 0).toLocaleString()}`,
              icon: "💰",
              change: "+23%",
            },
            {
              label: "Total Users",
              value: users.length.toString(),
              icon: "👥",
              change: "+15%",
            },
            {
              label: "Total Orders",
              value: orders.length.toString(),
              icon: "📦",
              change: "+23%",
            },
            {
              label: "Total Reviews",
              value: totalReviews.toString(),
              icon: "💬",
              change: "+0%",
            },
            {
              label: "Average Rating",
              value: overallAverageRating.toFixed(1),
              icon: "⭐",
              change: "+0%",
            },
            {
              label: "Reviewed Events",
              value: reviewedEvents.toString(),
              icon: "📝",
              change: "+0%",
            },
            {
              label: "Top Rated Event",
              value: topRatedEvent?.event?.title || "None",
              icon: "🏆",
              change: "+0%",
            },
          ].map((stat, i) => (
            <div key={stat.label} className="animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
              <StatsCard stat={stat} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 animate-fadeInUp delay-300">
            <h2 className="text-lg font-bold text-white mb-4">Recent Orders</h2>
            <TableUI
              columns={["Order ID", "User", "Event", "Total", "Status"]}
              data={orders.slice(0, 5)}
              renderRow={(order) => (
                <tr key={order?.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-sm text-violet-400 font-mono">{order?._id}</td>
                  <td className="px-6 py-4 text-sm text-white">{order?.user?.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{order?.event?.title}</td>
                  <td className="px-6 py-4 text-sm text-white font-semibold">₹{order?.billedAmount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>
                      {order?.status}
                    </span>
                  </td>
                </tr>
              )}
            />
          </div>

          <div className="animate-fadeInUp delay-400">
            <h2 className="text-lg font-bold text-white mb-4">Revenue Overview</h2>
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 h-72 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-end justify-center gap-2 mb-6">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <div
                      key={i}
                      className="w-4 rounded-t-sm bg-gradient-to-t from-violet-600 to-fuchsia-500 opacity-80 animate-slideInUp"
                      style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
                    />
                  ))}
                </div>
                <p className="text-slate-400 text-sm">Monthly Revenue Trend</p>
                <p className="text-white text-2xl font-bold mt-1">{`₹${orders.reduce((sum, order) => sum + order.billedAmount, 0).toLocaleString()}`} </p>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-3 animate-fadeInUp delay-500">
          <h2 className="text-lg font-bold text-white mb-4">Ratings Panel</h2>
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5">
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Total Reviews</p>
                <p className="text-3xl font-bold text-white">{totalReviews}</p>
              </div>
              <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5">
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Avg Rating</p>
                <p className="text-3xl font-bold text-white">{overallAverageRating.toFixed(1)}</p>
              </div>
              <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5">
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Top Event</p>
                <p className="text-xl font-semibold text-white">{topRatedEvent?.event?.title || "No ratings yet"}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Top Rated Events
              </h3>
              <div className="space-y-3">
                {ratings
                  .slice()
                  .sort((a, b) => b.averageRating - a.averageRating)
                  .slice(0, 3)
                  .map((group) => (
                    <div key={group.event?._id || group.event?.title} className="rounded-2xl bg-slate-950/80 border border-white/5 p-4">
                      <p className="text-white font-semibold">{group.event?.title || "Unknown Event"}</p>
                      <p className="text-slate-400 text-sm mt-1">
                        {group?.averageRating.toFixed(1)} average from {group?.totalReviews} reviews
                      </p>
                    </div>
                  ))}
                {ratings.length === 0 && <p className="text-slate-500">No event ratings available yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}