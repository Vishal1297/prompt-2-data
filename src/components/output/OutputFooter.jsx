import { FileDown } from "lucide-react";

const OutputFooter = ({ generatedData, isGenerating, handleDownload, exportFormat }) => {
  return (
    <div className="p-6 sm:p-8 border-t border-slate-50 bg-slate-50/30">
      <button
        onClick={handleDownload}
        disabled={!generatedData || isGenerating}
        className="w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] sm:text-xs tracking-wider transition-all border-2 border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-600 group uppercase"
      >
        <FileDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
        Export to {exportFormat}
      </button>
    </div>
  );
};

export default OutputFooter;
