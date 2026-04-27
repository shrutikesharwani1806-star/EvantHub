export default function CommentCard({ comment }) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:border-violet-500/20 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">
          {comment.user?.name?.[0]?.toUpperCase() || comment.userName?.[0]?.toUpperCase() || "A"}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">
            {comment.user?.name || comment.user || comment.userName || "Anonymous"}
          </p>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-xs ${i < comment.rating ? "text-amber-400" : "text-slate-600"}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">
        &ldquo;{comment.text}&rdquo;
      </p>
    </div>
  );
}
