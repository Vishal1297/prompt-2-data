import { Zap } from "lucide-react";
import { PROVIDERS } from "../constants";

const Header = ({ providerId, handleProviderChange }) => {
  return (
    <header className="mb-2 md:mb-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 rotate-3">
          <Zap className="text-white w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Prompt<span className="text-indigo-600">2</span>Data
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
              v0.1.0 • Beta
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
        {Object.values(PROVIDERS).map((p) => (
          <button
            key={p.id}
            onClick={() => handleProviderChange(p.id)}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
              providerId === p.id
                ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <p.icon
              className={`w-3.5 h-3.5 ${providerId === p.id ? "text-white" : p.color}`}
            />
            {p.name}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
