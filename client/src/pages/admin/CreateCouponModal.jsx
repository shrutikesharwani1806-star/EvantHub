import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoupon } from "../../features/admin/adminSlice";

export default function CreateCouponModal({ isOpen, onClose, onSave, editCoupon }) {

  const [showModel, setShowModel] = useState(false)

  const {coupons , adminLoading, adminSuccess, adminError, adminErrorMessage} = useSelector(state => state.admin)

  const dispatch = useDispatch()

  const handleShowModel = () => {
    setShowModel(showModel ? false : true)
  }

  const [formData, setFormData] = useState({
    couponCode : "",
    couponDiscount : ""
  });

  const { couponCode, couponDiscount } = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addCoupon(formData))
    setFormData({ couponCode: "", couponDiscount: ""})

    handleShowModel()
    
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-white/10 shadow-2xl shadow-black/50 animate-scaleIn">
        <div className="sticky top-0 z-10 bg-slate-900 border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {editCoupon ? "Edit Coupon" : "Create New Coupon"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">Coupon Code</label>
              <input
                name="couponCode"
                type="text"
                value={couponCode}
                onChange={handleChange}
                placeholder="e.g. SUMMER25"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">Discount</label>
                <input
                  name="couponDiscount"
                  type="number"
                  value={couponDiscount}
                  onChange={handleChange}
                  placeholder="e.g. 20% or ₹500"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
            </div>


            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <button
                onClick={onClose}
                className="flex-1 py-3 text-sm font-semibold text-slate-300 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                // onClick={handleShowModel}
                className="flex-1 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25 btn-glow"
              >
                {editCoupon ? "Update Coupon" : "Create Coupon"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
