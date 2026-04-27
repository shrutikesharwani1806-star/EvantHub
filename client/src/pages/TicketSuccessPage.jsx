import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getEvent } from "../features/event/eventSlice";
// import { toast } from "react-toastify";
// import Loader from "../components/Loader";

export default function TicketSuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  // const { order, orderError, orderErrorMessage } = useSelector(state => state.order)
  // const { event, eventError, eventErrorMessage, eventLoading, eventSuccess } = useSelector(state => state.event)

  // const { eid } = useParams()

  const navigate = useNavigate();
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   if (!eventError && !eventErrorMessage && eid) {
  //     dispatch(getEvent(eid));
  //   }

  //   if (eventError && eventErrorMessage) {
  //     toast.error(eventErrorMessage, { position: "top-center", theme: "dark" });
  //   }
  // }, [dispatch, eid, eventError, eventErrorMessage]);

  // if (eventLoading) {
  //   return (
  //     <Loader text="Fetching Your Details" />
  //   )
  // }

  useEffect(() => {
    // 🎉 Stop confetti after 3s
    const timer1 = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);

    // 🔁 Redirect after 4s
    const timer2 = setTimeout(() => {
      navigate("/my-tickets");
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      {showConfetti && <Confetti />}

      <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center backdrop-blur-xl max-w-md w-full">

        <div className="text-5xl mb-4">🎉</div>

        <h1 className="text-2xl font-extrabold text-white mb-3">
          Congratulations!
        </h1>

        <p className="text-slate-400 mb-6">
          Your ticket has been successfully booked.
        </p>
        <Link
          to="/events"
          className="inline-block mt-6 px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-500 transition"
        >
          Explore More Events
        </Link>
      </div>
    </div>
  );
}