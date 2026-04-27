import { categories } from "../mock/events";

export default function CategoryFilter() {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
            category === "All"
              ? "bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-500/25"
              : "bg-white/5 text-slate-300 border-white/10 hover:bg-violet-600/20 hover:text-violet-300 hover:border-violet-500/30"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
