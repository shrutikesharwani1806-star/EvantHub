import { useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import TableUI from "../../components/TableUI";
import { useApp } from "../../context/AppContext";
import { getAllOrders } from "../../features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

export default function AdminOrders() {

    const { users , events , orders , adminLoading , adminSuccess , adminError , adminErrorMessage } = useSelector(state => state.admin)

  const { updateOrderStatus } = useApp();
  const [filter, setFilter] = useState("All");

  const statusColors = {
    Completed: "bg-emerald-500/20 text-emerald-400",
    Pending: "bg-amber-500/20 text-amber-400",
    Refunded: "bg-red-500/20 text-red-400",
  };

  const statusCycle = {
    Pending: "Completed",
    Completed: "Refunded",
    Refunded: "Pending",
  };

  const filters = ["All", "Completed", "Pending", "Refunded"];
  const filteredOrders = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  
    const dispatch = useDispatch()
    // const { orders } = useApp();
  
  
  
    useEffect(() => {
  
      if (!adminError){
       //fetch orders
       dispatch(getAllOrders())
      }
  
      if(adminError , adminErrorMessage){
        toast.error(adminErrorMessage , {position : "top-center" , theme : "dark"})
      }
  
    },[adminError, adminErrorMessage])
  
    if (adminLoading){
      return(
        <Loader text="loading Admin Data..." />
      )
    }

  return (
    <div>
      <AdminHeader title="Orders" />
      <div className="p-6 space-y-6 page-transition">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeInUp">
          <div>
            <h2 className="text-lg font-bold text-white">All Orders</h2>
            <p className="text-slate-400 text-sm">{filteredOrders.length} orders {filter !== "All" ? `(${filter})` : "total"}</p>
          </div>
          <div className="flex gap-2">
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
        </div>

        <div className="animate-fadeInUp delay-100">
          <TableUI
            columns={["Order ID", "User", "Event", "Qty", "Total", "Date", "Status"]}
            data={filteredOrders}
            renderRow={(order, index) => (
              <tr key={order._id} className="hover:bg-white/[0.02] transition-colors animate-fadeInUp" style={{ animationDelay: `${index * 50}ms` }}>
                <td className="px-6 py-4 text-sm text-violet-400 font-mono">{order._id}</td>
                <td className="px-6 py-4 text-sm text-white">{order.user ? order.user.name : 'Unknown User'}</td>
                <td className="px-6 py-4 text-sm text-slate-300">{order.event ? order.event.title : 'Unknown Event'}</td>
                <td className="px-6 py-4 text-sm text-slate-300 text-center">{order.seats}</td>
                <td className="px-6 py-4 text-sm text-white font-semibold">{order.billedAmount}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => updateOrderStatus(order._id, statusCycle[order.status])}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 ${statusColors[order.status]}`}
                    title={`Click to change to ${statusCycle[order.status]}`}
                  >
                    {order.status}
                  </button>
                </td>
              </tr>
            )}
          />
        </div>
      </div>
    </div>
  );
}
