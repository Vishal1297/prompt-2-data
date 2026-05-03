import { useState } from "react";
import { PROVIDERS } from "./constants";
import useGeneration from "./hooks/useGeneration";
import { handleDownload as handleDownloadUtil } from "./utils/export";
import Header from "./components/Header";
import ConfigSidebar from "./components/config/ConfigSidebar";
import OutputArea from "./components/output/OutputArea";

const App = () => {
  // Config State
  const [coreTopic, setCoreTopic] = useState("");
  const [advancedFocus, setAdvancedFocus] = useState("");
  const [datasetType, setDatasetType] = useState("Q&A");
  const [generationMode, setGenerationMode] = useState("Basic");
  const [datasetSize, setDatasetSize] = useState(5);
  const [exportFormat, setExportFormat] = useState("json");

  // Provider State
  const [providerId, setProviderId] = useState(PROVIDERS.OPENROUTER.id);
  const [modelName, setModelName] = useState(PROVIDERS.OPENROUTER.defaultModel);
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_OPENROUTER_API_KEY || "");
  const [baseUrl, setBaseUrl] = useState(PROVIDERS.OPENROUTER.defaultBaseUrl);

  const { isGenerating, generatedData, status, error, handleGenerate, setStatus, setError } = useGeneration();

  const activeProvider = PROVIDERS[providerId.toUpperCase()];

  const handleProviderChange = (newProviderId) => {
    setProviderId(newProviderId);
    const newProvider = PROVIDERS[newProviderId.toUpperCase()];
    setModelName(newProvider.defaultModel);
    setBaseUrl(newProvider.defaultBaseUrl);

    const envKeyMap = {
      gemini: "VITE_GEMINI_API_KEY",
      openrouter: "VITE_OPENROUTER_API_KEY",
      openai: "VITE_OPENAI_API_KEY",
    };
    const envKey = import.meta.env[envKeyMap[newProviderId]];
    if (envKey) setApiKey(envKey);
    else setApiKey("");
  };

  const onGenerate = () => {
    handleGenerate({
      coreTopic,
      advancedFocus,
      datasetType,
      generationMode,
      datasetSize,
      providerId,
      apiKey,
      baseUrl,
      modelName,
    });
  };

  const onDownload = () => {
    handleDownloadUtil(generatedData, exportFormat, coreTopic, setStatus, setError);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-4 sm:p-6 md:p-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-[1400px] mx-auto">
        <Header providerId={providerId} handleProviderChange={handleProviderChange} />

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[400px_1fr] gap-8 lg:gap-10">
          <ConfigSidebar
            providerId={providerId}
            activeProvider={activeProvider}
            modelName={modelName}
            setModelName={setModelName}
            baseUrl={baseUrl}
            setBaseUrl={setBaseUrl}
            apiKey={apiKey}
            setApiKey={setApiKey}
            coreTopic={coreTopic}
            setCoreTopic={setCoreTopic}
            datasetType={datasetType}
            setDatasetType={setDatasetType}
            advancedFocus={advancedFocus}
            setAdvancedFocus={setAdvancedFocus}
            datasetSize={datasetSize}
            setDatasetSize={setDatasetSize}
            generationMode={generationMode}
            setGenerationMode={setGenerationMode}
            error={error}
            isGenerating={isGenerating}
            handleGenerate={onGenerate}
          />

          <OutputArea
            status={status}
            isGenerating={isGenerating}
            exportFormat={exportFormat}
            setExportFormat={setExportFormat}
            generatedData={generatedData}
            handleDownload={onDownload}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
