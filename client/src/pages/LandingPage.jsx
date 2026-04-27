import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import EventCard from "../components/EventCard";
import { categories } from "../mock/events";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../features/event/eventSlice";
import Loader from "../components/Loader";

export default function LandingPage() {
  const { events, eventLoading, eventError, eventErrorMessage } = useSelector((state) => state.event);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  // if(eventLoading){
  //     return <Loader />
  // }

  const activeEvents = events?.filter((event) => event.isActive) || [];
  const featured = activeEvents.slice(0, 6);

  return (
    <>
      <HeroCarousel />

      <section className="relative py-24 bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Trending Now
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Featured Events
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.length === 0 ? (
              <p className="text-white col-span-full">No active featured events found.</p>
            ) : (
              featured.map((event) => (
                <EventCard key={event._id || event.id} event={event} />
              ))
            )}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/events"
              className="inline-flex px-8 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25"
            >
              View All Events →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Browse By Interest
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Explore Categories
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.slice(1).map((cat, i) => (
              <Link
                key={cat}
                to="/events"
                className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 text-center hover:border-violet-500/30 hover:bg-violet-600/10 transition-all duration-500 hover:-translate-y-1"
              >
                <span className="text-4xl block mb-3">
                  {["🎵", "💻", "💼", "🎭", "🎨", "🏃", "🍕", "🧘"][i]}
                </span>
                <p className="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors duration-300">
                  {cat}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-fuchsia-600/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[128px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Ready to Discover Your
            <span className="block bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mt-2">
              Next Adventure?
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of experience seekers who use EventHub to find events
            that truly resonate with them.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-10 py-4 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25"
            >
              Get Started for Free
            </Link>
            <Link
              to="/events"
              className="px-10 py-4 text-sm font-semibold text-slate-300 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
