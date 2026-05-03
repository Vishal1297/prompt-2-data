import { AlertCircle, Brain, Loader2, Zap } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Credentials from "./Credentials";
import DatasetConfig from "./DatasetConfig";
import GenerationSettings from "./GenerationSettings";

const ConfigSidebar = (props) => {
  const {
    providerId,
    activeProvider,
    modelName,
    setModelName,
    baseUrl,
    setBaseUrl,
    apiKey,
    setApiKey,
    coreTopic,
    setCoreTopic,
    datasetType,
    setDatasetType,
    advancedFocus,
    setAdvancedFocus,
    datasetSize,
    setDatasetSize,
    generationMode,
    setGenerationMode,
    error,
    isGenerating,
    handleGenerate,
  } = props;

  return (
    <aside className="space-y-8 overflow-y-auto">
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8">
        <SectionHeader icon={Brain} title="Configuration" />

        <div className="space-y-8">
          <Credentials
            providerId={providerId}
            activeProvider={activeProvider}
            modelName={modelName}
            setModelName={setModelName}
            baseUrl={baseUrl}
            setBaseUrl={setBaseUrl}
            apiKey={apiKey}
            setApiKey={setApiKey}
          />

          <div className="h-px bg-slate-100" />

          <DatasetConfig
            coreTopic={coreTopic}
            setCoreTopic={setCoreTopic}
            datasetType={datasetType}
            setDatasetType={setDatasetType}
            advancedFocus={advancedFocus}
            setAdvancedFocus={setAdvancedFocus}
          />

          <div className="h-px bg-slate-100" />

          <GenerationSettings
            datasetSize={datasetSize}
            setDatasetSize={setDatasetSize}
            generationMode={generationMode}
            setGenerationMode={setGenerationMode}
          />

          {error && (
            <div className="p-4 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-100 flex items-start gap-3 leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`w-full py-4 px-6 rounded-[1.25rem] text-white font-black text-sm tracking-wide transition-all shadow-xl disabled:shadow-none disabled:opacity-50 active:scale-95 group relative overflow-hidden ${
              isGenerating
                ? "bg-indigo-400"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Zap className="w-4 h-4 fill-current" />
              )}
              {isGenerating ? "GENERATING..." : "GENERATE DATASET"}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ConfigSidebar;
