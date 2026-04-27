import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import EventCard from "../components/EventCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../features/event/eventSlice";
import Loader from "../components/Loader";

export default function EventsPage() {
  const { events, eventLoading, eventError } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const activeEvents = events?.filter((event) => event.isActive) || [];

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Discover
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            All Events
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <SearchBar />
            <Link
              to="/create-event"
              className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold rounded-xl bg-violet-600 text-white hover:bg-violet-500 transition-all duration-200"
            >
              Request Event
            </Link>
          </div>
          <div className="mt-6">
            <CategoryFilter />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {eventLoading ? (
            <Loader />
          ) : activeEvents.length === 0 ? (
            <p className="text-white col-span-full">No active events available.</p>
          ) : (
            activeEvents.map((event) => (
              <EventCard key={event._id || event.id} event={event} />
            ))
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mt-14">
          <button className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center hover:bg-violet-600/20 hover:text-white transition-all duration-300">
            ←
          </button>
          <button className="w-10 h-10 rounded-lg bg-violet-600 text-white flex items-center justify-center text-sm font-semibold">
            1
          </button>
          <button className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center text-sm hover:bg-violet-600/20 hover:text-white transition-all duration-300">
            2
          </button>
          <button className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center text-sm hover:bg-violet-600/20 hover:text-white transition-all duration-300">
            3
          </button>
          <button className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center hover:bg-violet-600/20 hover:text-white transition-all duration-300">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
