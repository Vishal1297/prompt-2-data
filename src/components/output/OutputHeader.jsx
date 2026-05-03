import { BarChart2 } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";

const OutputHeader = ({ status, isGenerating, exportFormat, setExportFormat }) => {
  return (
    <div className="p-6 sm:p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
      <SectionHeader icon={BarChart2} title="Output Preview" color="text-blue-500" />
      
      <div className="flex items-center gap-4 flex-wrap">
        <StatusBadge status={status} isGenerating={isGenerating} />
        <div className="hidden sm:block h-6 w-px bg-slate-100" />
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {["json", "csv"].map(f => (
            <button
              key={f} onClick={() => setExportFormat(f)}
              className={`px-3 sm:px-4 py-1.5 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all ${
                exportFormat === f ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OutputHeader;
