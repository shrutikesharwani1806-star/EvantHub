import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const eventId = event._id || event.id;
  const image = event.eventImage || event.image;
  const location = event.eventLocation || event.location;
  const price = typeof event.ticketPrice === "number" ? `₹${event.ticketPrice}` : event.price;
  const category = event.eventArtistName || event.category || "Event";
  const date = event.eventDate || event.date;

  return (
    <Link to={`/events/${eventId}`} className="group block">
      <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-500 hover:shadow-violet-500/15 hover:border-violet-500/20 hover:-translate-y-2 hover:scale-[1.02]">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-violet-500/90 text-white backdrop-blur-sm">
              {category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/40 text-white backdrop-blur-sm">
              {date}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-violet-300 transition-colors duration-300 truncate">
            {event.title}
          </h3>
          <p className="text-slate-400 text-sm flex items-center gap-1 mb-4">
            <span>📍</span> {location}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-violet-400 font-bold text-lg">
              {price}
            </span>
            <span className="text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-full">
              Book Now →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
