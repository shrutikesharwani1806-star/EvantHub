import AdminHeader from "../../components/AdminHeader";
import TableUI from "../../components/TableUI";
import Loader from "../../components/Loader";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRatings } from "../../features/admin/adminSlice";
import { toast } from "react-toastify";

function renderStars(value) {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < rounded ? "text-amber-400" : "text-slate-600"}
        >
          ★
        </span>
      ))}
      <span className="text-slate-400 text-xs">{value.toFixed(1)}</span>
    </div>
  );
}

export default function AdminRatings() {
  const { ratings, orders, adminLoading, adminError, adminErrorMessage } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRatings());
  }, [dispatch]);

  useEffect(() => {
    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, { position: "top-center", theme: "dark" });
    }
  }, [adminError, adminErrorMessage]);

  const { totalReviews, overallAverage, topEvents, latestReviews } = useMemo(() => {
    const flattened = ratings.flatMap((group) =>
      (group.reviews || []).map((review) => ({
        ...review,
        eventTitle: group.event?.title || "Unknown Event",
      }))
    ).filter(Boolean);

    const total = ratings.reduce((sum, group) => sum + (group.totalReviews || 0), 0);
    const weightedSum = ratings.reduce(
      (sum, group) => sum + (group.averageRating || 0) * (group.totalReviews || 0),
      0
    );

    const average = total ? weightedSum / total : 0;
    const sortedTop = [...ratings].sort((a, b) => b.averageRating - a.averageRating).slice(0, 5);
    const sortedReviews = flattened
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);

    return {
      totalReviews: total,
      overallAverage: average,
      topEvents: sortedTop,
      latestReviews: sortedReviews,
    };
  }, [ratings]);

  if (adminLoading) {
    return <Loader text="Loading ratings..." />;
  }

  return (
    <div>
      <AdminHeader title="Ratings" />
      <div className="p-6 space-y-8 page-transition">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-3">
              Total Reviews
            </p>
            <p className="text-3xl font-bold text-white">{totalReviews}</p>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-3">
              Average Rating
            </p>
            <p className="text-3xl font-bold text-white">{overallAverage.toFixed(1)}</p>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-3">
              Reviewed Events
            </p>
            <p className="text-3xl font-bold text-white">{ratings.length}</p>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-3">
              Top Event
            </p>
            <p className="text-xl font-semibold text-white">
              {topEvents[0]?.event?.title || "No Ratings Yet"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
            <h2 className="text-lg font-bold text-white mb-4">Event Ratings</h2>
            <TableUI
              columns={["Event", "Avg Rating", "Reviews"]}
              data={ratings}
              renderRow={(group) => (
                <tr key={group.event?._id || group.event?.title} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-sm text-white">{group.event?.title || "Unknown"}</td>
                  <td className="px-6 py-4 text-sm">{renderStars(group.averageRating)}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{group.totalReviews}</td>
                </tr>
              )}
            />
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
            <h2 className="text-lg font-bold text-white mb-4">Latest Reviews</h2>
            {latestReviews.length > 0 ? (
              <TableUI
                columns={["Event", "User", "Rating", "Comment"]}
                data={latestReviews}
                renderRow={(review) => (
                  <tr key={review.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-sm text-white">{review.eventTitle}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {review?.user?.name || review?.userName || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-sm">{renderStars(review.rating)}</td>
                    <td className="px-6 py-4 text-sm text-slate-300 max-w-xs truncate">
                      {review.text}
                    </td>
                  </tr>
                )}
              />
            ) : (
              <p className="text-slate-400 text-sm">No reviews available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
