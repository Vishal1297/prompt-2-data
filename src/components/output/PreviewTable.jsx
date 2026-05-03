import { Layers } from "lucide-react";

const PreviewTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
          <Layers className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-slate-900 font-bold mb-1">No Data Generated</h3>
        <p className="text-slate-500 text-xs max-w-[200px] leading-relaxed">
          Configure your settings and click the generate button to start.
        </p>
      </div>
    );
  }

  const keys = Object.keys(data[0]);

  return (
    <div className="h-[60vh] overflow-y-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-100 sticky top-0 backdrop-blur-sm z-10">
            <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-[10px] w-16 text-center">
              #
            </th>
            {keys.map((key) => (
              <th
                key={key}
                className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-[10px]"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((row, index) => (
            <tr
              key={index}
              className="group hover:bg-indigo-50/30 transition-colors"
            >
              <td className="px-6 py-4 text-slate-400 text-center font-bold text-xs">
                {index + 1}
              </td>
              {keys.map((key, i) => (
                <td
                  key={i}
                  className="px-6 py-4 text-slate-700 align-top max-w-md"
                >
                  <div className="line-clamp-2 group-hover:line-clamp-none transition-all duration-300 ease-in-out text-[13px] leading-relaxed">
                    {String(row[key])}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviewTable;
