import React from "react";

export default function TableUI({ columns, data, renderRow }) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data?.map((item, i) => (
              <React.Fragment key={item._id || item.id || i}>
                {renderRow(item, i)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
