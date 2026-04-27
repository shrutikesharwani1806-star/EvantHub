import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import { useApp } from "../../context/AppContext";
import CreateCouponModal from "./CreateCouponModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { couponUpdate, getAllCoupons } from "../../features/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

export default function AdminCoupons() {

  const { coupons, adminLoading, adminSuccess, adminError, adminErrorMessage } = useSelector(state => state.admin)

  const dispatch = useDispatch()
  // const { orders } = useApp();

  const { addCoupon, updateCoupon, deleteCoupon } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editCoupon, setEditCoupon] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleCreate = () => {
    setEditCoupon(null);
    setModalOpen(true);
  };

  const handleEdit = (coupon) => {
    setEditCoupon(coupon);
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (editCoupon) {
      updateCoupon(editCoupon.id, data);
    } else {
      addCoupon(data);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteCoupon(deleteTarget.id);
      setDeleteTarget(null);
    }
  };


  const handleCouponUpdate = (couponDetails) => {
    dispatch(couponUpdate(couponDetails))
  }


  useEffect(() => {
    dispatch(getAllCoupons())
  }, [dispatch])

  useEffect(() => {
    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, { position: "top-center", theme: "dark" })
    }
  }, [adminError, adminErrorMessage])

  if (adminLoading) {
    return (
      <Loader text="loading Admin Data..." />
    )
  }



  return (
    <div>
      <AdminHeader title="Coupons" />
      <div className="p-6 space-y-6 page-transition">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeInUp">
          <div>
            <h2 className="text-lg font-bold text-white">All Coupons</h2>
            <p className="text-slate-400 text-sm">{coupons.length} coupons created</p>
          </div>
          <button
            onClick={handleCreate}
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25 btn-glow"
          >
            + Create Coupon
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {coupons.map((coupon, i) => (
            <div
              key={coupon._id}
              className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden card-hover animate-fadeInUp"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

              <div className="flex items-center justify-between mb-4">
                <div className="px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <p className="text-violet-400 font-mono font-bold text-sm tracking-wider">
                    {coupon.couponCode}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full ${coupon.isActive
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                    }`}
                >
                  {coupon.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-2xl font-extrabold text-white">{coupon.couponDiscount ?? coupon.CouponDiscount}</p>
                <p className="text-slate-400 text-sm">{coupon.type} Percentage discount </p>
              </div>


              <div className="mt-5 pt-4 border-t border-white/5 flex gap-2">
                <button
                  onClick={() => handleEdit(coupon)}
                  className="flex-1 px-3 py-2 text-xs font-medium rounded-lg bg-white/5 text-slate-300 border border-white/10 hover:bg-violet-600/20 hover:text-violet-300 hover:border-violet-500/30 transition-all duration-200 text-center"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCouponUpdate({cid : coupon._id , isActive : coupon.isActive ? false : true})}
                  className="flex-1 px-3 py-2 text-xs font-medium rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all duration-200 text-center"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateCouponModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditCoupon(null); }}
        onSave={handleSave}
        editCoupon={editCoupon}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Coupon"
        message={`Are you sure you want to delete coupon "${deleteTarget?.code}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
