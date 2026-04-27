import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEvent } from "../features/event/eventSlice";
import { toast } from "react-toastify";
import { applyCoupon, ticketBook } from "../features/order/orderSlice";
import Loader from "../components/Loader";


// const event = events[0];


export default function BookTicketPage() {

  const { user } = useSelector(state => state.auth);
  const { eid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { event, eventLoading, eventComments, eventSuccess, eventError, eventErrorMessage } = useSelector(state => state.event);
  const { coupons, order,  orderLoading, orderSuccess, orderError, orderErrorMessage } = useSelector(state => state.order);

  const [ticketCount, setTicketCount] = useState(1);
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    dispatch(applyCoupon({ couponCode }));
  };

  const handleTicketBooking = () => {
    const total = coupons?.isActive
      ? (event.ticketPrice * ticketCount) * (1 - coupons?.couponDiscount / 100)
      : event.ticketPrice * ticketCount;

    if (user.credits < total) {
      navigate('/profile');
      return;
    }

    dispatch(ticketBook({
      eventId: eid,
      numberOfSeats: ticketCount,
      couponCode: couponCode || null,
    }))

    setTimeout(() => {
      navigate("/ticket-success");
    }, 1000);
  }

  useEffect(() => {
    if (!eventError && !eventErrorMessage) {
      dispatch(getEvent(eid));
    }

    if ((eventError && eventErrorMessage) || (orderError && orderErrorMessage)) {
      toast.error(eventErrorMessage || orderErrorMessage, {
        position: "top-center",
        theme: "dark"
      });
    }
  }, [eventError, eventErrorMessage, orderError, orderErrorMessage]);

  // ✅ AFTER ALL HOOKS
  if (orderLoading || eventLoading || !event || Object.keys(event).length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/events" className="text-violet-400 text-sm hover:text-violet-300 transition-colors">
            ← Back to Events
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold text-white mb-10">Book Your Tickets</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h2 className="text-lg font-bold text-white mb-6">Ticket Selection</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-violet-600/10 border border-violet-500/30 p-5">
                  <div>
                    <p className="text-white font-semibold">Select number of seats</p>
                    <p className="text-slate-400 text-sm">Standard entry · ₹{event.ticketPrice}/person</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setTicketCount(ticketCount === 1 ? 1 : ticketCount - 1)} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-violet-600/20 transition-colors">
                      −
                    </button>
                    <span className="text-white font-semibold w-6 text-center">{ticketCount}</span>
                    <button onClick={() => setTicketCount(ticketCount === 5 ? 5 : ticketCount + 1)} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-violet-600/20 transition-colors">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h2 className="text-lg font-bold text-white mb-6">Your Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue={user?.phone}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h2 className="text-lg font-bold text-white mb-6">Apply Coupon</h2>
              <div className="flex gap-3">
                <form onSubmit={handleApplyCoupon}>

                  {/* Row: Input + Button */}
                  <div className="flex items-center">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      type="text"
                      placeholder="Enter coupon code"
                      className={
                        coupons?.isActive
                          ? "flex-1 px-4 py-3 rounded-xl bg-green-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none"
                          : "flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none"
                      }
                    />

                    <button
                      type="submit"
                      disabled={couponCode === ""}
                      className="px-6 py-3 ml-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-colors disabled:hidden"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Message BELOW input */}
                  {orderSuccess && coupons?.isActive && (
                    <p className="text-xs text-green-400 mt-1 ml-1">
                      Coupon applied ✅
                    </p>
                  )}

                </form>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 space-y-5">
              <h2 className="text-lg font-bold text-white">Order Summary</h2>

              <div className="flex items-center gap-4 pb-5 border-b border-white/5">
                <img
                  src={event.eventImage}
                  alt={event.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-white font-semibold">{event.title}</h3>
                  <p className="text-slate-400 text-sm">{event.eventDate}</p>
                  <p className="text-slate-400 text-sm">{event.eventLocation}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Total Seats</span>
                  <span>{ticketCount}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Platform Fee</span>
                  <span>free</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>GST</span>
                  <span>free</span>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-white/10">
                <span className="text-white font-bold">Total</span>
                <span className="text-xl font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  ₹{coupons?.isActive
                    ? (event.ticketPrice * ticketCount) * (1 - coupons?.couponDiscount / 100)
                    : event.ticketPrice * ticketCount
                  }
                </span>
              </div>

              <button onClick={handleTicketBooking} disabled={user.credits < (coupons?.isActive ? (event.ticketPrice * ticketCount) * (1 - coupons?.couponDiscount / 100) : event.ticketPrice * ticketCount)} className="w-full py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed">
                Proceed to Pay ₹{coupons?.isActive
                  ? (event.ticketPrice * ticketCount) * (1 - coupons?.couponDiscount / 100)
                  : event.ticketPrice * ticketCount
                }
              </button>

              {user.credits < (coupons?.isActive ? (event.ticketPrice * ticketCount) * (1 - coupons?.couponDiscount / 100) : event.ticketPrice * ticketCount) && (
                <p className="text-red-400 text-xs text-center">
                  Insufficient credits. Please add more credits to your account.
                </p>
              )}

              <p className="text-slate-500 text-xs text-center">
                🔒 Secured by 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
