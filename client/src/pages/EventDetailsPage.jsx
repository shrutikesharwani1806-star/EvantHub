import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvent, getEventComments } from "../features/event/eventSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";

export default function EventDetailsPage() {
  const { user } = useSelector(state => state.auth)
  const { eid } = useParams();
  const dispatch = useDispatch();
  const { events, event: currentEvent, eventLoading, eventComments, eventSuccess, eventError, eventErrorMessage } = useSelector(state => state.event);

  useEffect(() => {

    if (!eventError && !eventErrorMessage) {
      //fetch Event
      dispatch(getEvent(eid))
      //fetch commnets
      dispatch(getEventComments(eid))
    }

    if (eventError && eventErrorMessage) {
      toast.error(eventErrorMessage, { position: "top-center", theme: "dark" })
    }
  }, [eventError, eventErrorMessage, dispatch, eid]);





  const event = events.find((e) => e._id === eid || e.id === Number(eid)) || currentEvent;

  if (eventLoading) {
    return (
      <Loader text="Loading Event Details..." />
    );
  }

  if (!event || Object.keys(event).length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Event not found or not active.
      </div>
    );
  }

  const image = event.eventImage || event.image;
  const title = event.title;
  const category = event.eventArtistName || event.category || "Event";
  const location = event.eventLocation || event.location;
  const date = event.eventDate || event.date;
  const duration = event.duration || event.time;
  const venue = event.eventLocation || event.venue;
  const organizer = event.eventArtistName || event.organizer || "Organizer";
  const seats = event.totalSeats || event.seats;
  const price = typeof event.ticketPrice === "number" ? `₹${event.ticketPrice}` : event.price;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full bg-violet-500/90 text-white backdrop-blur-sm mb-4">
            {category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm">
            <span className="flex items-center gap-1">📍 {location}</span>
            <span className="flex items-center gap-1">📅 {date}</span>
            <span className="flex items-center gap-1">🕐 {duration}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">About This Event</h2>
              <p className="text-slate-300 leading-relaxed">{event.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">Event Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Venue</p>
                  <p className="text-white font-medium">{venue}</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">By</p>
                  <p className="text-white font-medium">{organizer}</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Date & Time</p>
                  <p className="text-white font-medium">{date} · {duration}</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Available Seats</p>
                  <p className="text-white font-medium">{seats?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div>
              {user && <CommentForm eventId={event._id || event.id} />}
              <h2 className="text-xl font-bold text-white mb-6">Reviews</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {eventComments.length > 0 ? (
                  eventComments.map((comment) => (
                    <CommentCard key={comment._id || comment.id} comment={comment} />
                  ))
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 text-slate-400 col-span-full">
                    No reviews yet. Be the first to leave feedback.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 space-y-6">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Price per ticket</p>
                <p className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {price}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 p-4">
                  <div>
                    <p className="text-slate-500 text-xs">entry Price</p>
                  </div>
                  <p className="text-violet-400 font-bold">{price}</p>
                </div>
              </div>

              {
                !user ? (
                  <Link
                    to={"/login"}
                    className="block w-full py-3.5 text-center text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25"
                  >
                    Login to Book Ticket
                  </Link>
                ) : (<Link
                  to={`/book-ticket/${event._id || event.id}`}
                  className="block w-full py-3.5 text-center text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25"
                >
                  Book Tickets Now
                </Link>)
              }

              <p className="text-slate-500 text-xs text-center">
                ⚡ Fast filling — {seats?.toLocaleString()} seats available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
