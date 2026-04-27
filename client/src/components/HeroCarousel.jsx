import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../features/event/eventSlice";

const cardPositions = [
  "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 scale-[0.7] opacity-40 rotate-[-6deg] z-10 hidden lg:block",
  "absolute left-[10%] top-1/2 -translate-y-1/2 scale-[0.85] opacity-60 rotate-[-3deg] z-20 hidden md:block",
  "relative z-30 scale-100",
  "absolute right-[10%] top-1/2 -translate-y-1/2 scale-[0.85] opacity-60 rotate-[3deg] z-20 hidden md:block",
  "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 scale-[0.7] opacity-40 rotate-[6deg] z-10 hidden lg:block",
];

export default function HeroCarousel() {
  const { events, eventLoading, eventError, eventErrorMessage } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const heroEvents = events?.filter((event) => event.isActive)?.slice(0, 5) || [];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=60')] bg-cover bg-center opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-[128px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Find Your Next
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Unforgettable Experience
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover curated events that match your mood. From music festivals
            to tech conferences — let AI find the perfect experience for you.
          </p>
        </div>

        <div className="relative flex items-center justify-center min-h-[340px] sm:min-h-[400px] md:min-h-[440px]">
          {heroEvents.length === 0 ? (
            <div className="text-center text-white">No active events available right now.</div>
          ) : (
            heroEvents.map((event, index) => (
              <div key={event._id || event.id} className={cardPositions[index]}>
              <Link
                to={`/events/${event._id}`}
                className="block w-[280px] sm:w-[320px] group"
              >
                <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 transition-all duration-500 hover:shadow-violet-500/20 hover:border-violet-500/30 hover:-translate-y-2">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={event.eventImage}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-violet-500/90 text-white backdrop-blur-sm">
                        ⌛{event.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-violet-300 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-slate-400 text-sm flex items-center gap-1 mb-3">
                      <span>📍</span> {event.eventLocation}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-violet-400 font-bold text-lg">
                        ₹{event.ticketPrice}
                      </span>
                      <span className="text-slate-500 text-xs">
                        {event.eventDate}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-10">
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-violet-600/20 hover:border-violet-500/30 transition-all duration-300">
            ←
          </button>
          <div className="flex items-center gap-2 mx-4">
            <span className="w-8 h-1.5 rounded-full bg-violet-500" />
            <span className="w-2 h-1.5 rounded-full bg-white/20" />
            <span className="w-2 h-1.5 rounded-full bg-white/20" />
            <span className="w-2 h-1.5 rounded-full bg-white/20" />
            <span className="w-2 h-1.5 rounded-full bg-white/20" />
          </div>
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-violet-600/20 hover:border-violet-500/30 transition-all duration-300">
            →
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link
            to="/events"
            className="px-8 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
          >
            Explore All Events
          </Link>
          <Link
            to="/register"
            className="px-8 py-3.5 text-sm font-semibold text-slate-300 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
}
