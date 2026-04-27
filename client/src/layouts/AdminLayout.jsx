import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AdminLayout() {

  const { user } = useSelector(state => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.isAdmin){
      navigate("/profile")
    }
  },[user])


  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminSidebar />
      <div className="lg:ml-64">
        <Outlet />
      </div>
    </div>
  );
}
