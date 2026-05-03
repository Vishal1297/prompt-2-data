import { Key } from "lucide-react";
import Label from "../ui/Label";
import InputField from "../ui/InputField";

const Credentials = ({ providerId, activeProvider, modelName, setModelName, baseUrl, setBaseUrl, apiKey, setApiKey }) => {
  return (
    <div className="space-y-4 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label info={activeProvider.name}>Model Name</Label>
          <InputField
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            placeholder="e.g. gpt-4o, llama3"
          />
        </div>
        <div>
          <Label info="API Endpoint">Base URL</Label>
          <InputField
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://api.openai.com/v1"
          />
        </div>
      </div>
      <div>
        <Label info={providerId === "ollama" ? "Not needed" : "sk-..."}>API Key</Label>
        <div className="relative">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
          <Key className="absolute left-4 top-3 w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
};

export default Credentials;
