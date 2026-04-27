import { useState, useEffect } from "react";
import AdminHeader from "../../components/AdminHeader";
import TableUI from "../../components/TableUI";
import CreateEventModal from "./CreateEventModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../features/admin/adminSlice";

export default function AdminEvents() {

  const dispatch = useDispatch();

  const {
    events = [],
    adminLoading,
    adminError,
    adminErrorMessage
  } = useSelector(state => state.admin);

  const [modalOpen, setModalOpen] = useState(false);
  const [editEventModel, setEditEventModel] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ✅ CREATE
  const handleCreate = () => {
    setEditEventModel(null);
    setModalOpen(true);
  };

  // ✅ EDIT (MAIN FIX)
  const handleEditEvent = (event) => {
    setEditEventModel(event);   // pass full event
    setModalOpen(true);         // open modal
  };

  // ✅ DELETE
  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      // dispatch(deleteEvent(deleteTarget._id));
      setDeleteTarget(null);
    }
  };

  // ✅ FETCH EVENTS
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  // ✅ ERROR TOAST
  useEffect(() => {
    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, {
        position: "top-center",
        theme: "dark"
      });
    }
  }, [adminError, adminErrorMessage]);

  if (adminLoading) {
    return <Loader text="Loading Admin Data..." />;
  }

  return (
    <div>
      <AdminHeader title="Events" />

      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-white">All Events</h2>
            <p className="text-slate-400 text-sm">
              {events.length} events total
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600"
          >
            + Add Event
          </button>
        </div>

        {/* Table */}
        <TableUI
          columns={["Event", "Location", "Date", "Price", "Category", "Seats", "Actions"]}
          data={events}
          renderRow={(event) => (
            <tr key={event._id} className="hover:bg-white/[0.02]">

              {/* Event */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={event.eventImage}
                    alt={event.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <span className="text-white text-sm">
                    {event.title}
                  </span>
                </div>
              </td>

              {/* Location */}
              <td className="px-6 py-4 text-slate-300 text-sm">
                {event.eventLocation}
              </td>

              {/* Date */}
              <td className="px-6 py-4 text-slate-300 text-sm">
                {event.eventDate}
              </td>

              {/* Price */}
              <td className="px-6 py-4 text-violet-400 font-semibold text-sm">
                ₹{event.ticketPrice}
              </td>

              {/* Duration */}
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-slate-300">
                  {event.duration}
                </span>
              </td>

              {/* Seats */}
              <td className="px-6 py-4 text-slate-300 text-sm">
                {event.totalSeats?.toLocaleString()}
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex gap-2">

                  <button
                    onClick={() => handleEditEvent(event)}
                    className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-violet-600/20"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteTarget(event)}
                    className="px-3 py-1.5 text-xs bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20"
                  >
                    Delete
                  </button>

                </div>
              </td>

            </tr>
          )}
        />

      </div>

      <CreateEventModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditEventModel(null);
        }}
        editEvent={editEventModel}
      />

      {/* ✅ DELETE CONFIRM */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Event"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}