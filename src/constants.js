import {
  Globe,
  Terminal,
  Database,
  Sparkles,
  Settings,
} from "lucide-react";

export const DATASET_TYPES = [
  "Q&A",
  "Summarization",
  "Classification",
  "Text Generation",
];

export const SCHEMA_PROPERTIES = {
  "Q&A": {
    question: { type: "STRING", description: "The question asked by a user." },
    answer: { type: "STRING", description: "The correct, detailed answer to the question." },
  },
  Summarization: {
    original_text: { type: "STRING", description: "A long paragraph or article." },
    summary: { type: "STRING", description: "A concise summary of the original text." },
  },
  Classification: {
    text: { type: "STRING", description: "The text to be classified." },
    label: { type: "STRING", description: "The classification label/category." },
  },
  "Text Generation": {
    prompt: { type: "STRING", description: "The prompt or instruction." },
    completion: { type: "STRING", description: "The generated text completion." },
  },
};

export const PROVIDERS = {
  OPENROUTER: {
    id: "openrouter",
    name: "OpenRouter",
    icon: Globe,
    defaultModel: "google/gemini-2.0-flash-001",
    defaultBaseUrl: "https://openrouter.ai/api/v1",
    type: "openai",
    color: "text-purple-500",
  },
  OLLAMA: {
    id: "ollama",
    name: "Ollama",
    icon: Terminal,
    defaultModel: "llama3.2:latest",
    defaultBaseUrl: "http://localhost:11434/v1",
    type: "openai",
    color: "text-orange-500",
  },
  OPENAI: {
    id: "openai",
    name: "OpenAI",
    icon: Database,
    defaultModel: "gpt-4o-mini",
    defaultBaseUrl: "https://api.openai.com/v1",
    type: "openai",
    color: "text-emerald-500",
  },
  GEMINI: {
    id: "gemini",
    name: "Gemini",
    icon: Sparkles,
    defaultModel: "gemini-2.5-flash",
    defaultBaseUrl: "https://generativelanguage.googleapis.com/v1beta",
    type: "google",
    color: "text-blue-500",
  },
  CUSTOM: {
    id: "custom",
    name: "Custom",
    icon: Settings,
    defaultModel: "",
    defaultBaseUrl: "",
    type: "openai",
    color: "text-slate-500",
  },
};
