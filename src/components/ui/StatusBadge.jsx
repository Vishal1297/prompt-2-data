import { Loader2, AlertCircle, CheckCircle2, Zap } from "lucide-react";

const StatusBadge = ({ status, isGenerating }) => {
  const isError = status.toLowerCase().includes("failed") || status.toLowerCase().includes("error");
  const isComplete = status.toLowerCase().includes("complete");

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
      isError ? "bg-red-50 border-red-100 text-red-600" :
      isComplete ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
      "bg-indigo-50 border-indigo-100 text-indigo-600"
    }`}>
      {isGenerating ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : isError ? (
        <AlertCircle className="w-3 h-3" />
      ) : isComplete ? (
        <CheckCircle2 className="w-3 h-3" />
      ) : (
        <Zap className="w-3 h-3" />
      )}
      {status}
    </div>
  );
};

export default StatusBadge;
