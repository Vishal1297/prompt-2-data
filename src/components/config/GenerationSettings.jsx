import Label from "../ui/Label";

const GenerationSettings = ({ datasetSize, setDatasetSize, generationMode, setGenerationMode }) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label>Dataset Size</Label>
          <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
            {datasetSize}
          </span>
        </div>
        <input
          type="range" min="1" max="50" value={datasetSize}
          onChange={(e) => setDatasetSize(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none accent-indigo-600 cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div>
          <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-0.5">Complexity</p>
          <p className="text-sm font-bold text-slate-700">{generationMode} Mode</p>
        </div>
        <button
          onClick={() => setGenerationMode(m => m === "Basic" ? "Advanced" : "Basic")}
          className={`w-12 h-6 rounded-full transition-all relative ${generationMode === "Advanced" ? "bg-indigo-600" : "bg-slate-300"}`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${generationMode === "Advanced" ? "left-7" : "left-1"}`} />
        </button>
      </div>
    </div>
  );
};

export default GenerationSettings;
