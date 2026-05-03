import { useState } from "react";
import { SCHEMA_PROPERTIES, PROVIDERS } from "../constants";

const useGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [status, setStatus] = useState("Idle");
  const [error, setError] = useState(null);

  const handleGenerate = async ({
    coreTopic,
    advancedFocus,
    datasetType,
    generationMode,
    datasetSize,
    providerId,
    apiKey,
    baseUrl,
    modelName,
  }) => {
    if (!coreTopic.trim()) {
      setError("Please provide a Core Topic (Domain).");
      return;
    }

    const activeProvider = PROVIDERS[providerId.toUpperCase()];
    if (providerId !== "ollama" && !apiKey.trim()) {
      setError(`API Key missing for ${activeProvider.name}.`);
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedData(null);
    setStatus("Initializing...");

    const currentProperties = SCHEMA_PROPERTIES[datasetType] || SCHEMA_PROPERTIES["Q&A"];
    const propertyKeys = Object.keys(currentProperties);

    const promptText = `
      Generate a high-quality ${datasetType} synthetic dataset about "${coreTopic}".
      ${advancedFocus ? `Critical Focus / Constraints / Edge Cases: ${advancedFocus}` : ""}
      Complexity Mode: ${generationMode}. ${generationMode === "Advanced" ? "Include nuanced, ambiguous, and complex examples." : "Keep examples clear and straightforward."}
      Quantity: Generate EXACTLY ${datasetSize} unique examples.
      Output: Return a JSON object with a single key "data" containing the array of objects. 
      Each object in the array must have these keys: ${propertyKeys.join(", ")}.
      DO NOT INCLUDE ANY CONVERSATIONAL TEXT OR MARKDOWN.
    `;

    try {
      let url, options;
      const cleanBaseUrl = baseUrl.replace(/\/$/, "");

      if (activeProvider.type === "google") {
        url = `${cleanBaseUrl}/models/${modelName}:generateContent?key=${apiKey}`;
        options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            systemInstruction: {
              parts: [{ text: "Expert data scientist. Output strictly JSON object with 'data' key." }],
            },
            generationConfig: {
              responseMimeType: "application/json",
              maxOutputTokens: 4096,
              temperature: 0.8,
              responseSchema: {
                type: "OBJECT",
                properties: {
                  data: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: currentProperties,
                      required: propertyKeys,
                    },
                  },
                },
                required: ["data"],
              },
            },
          }),
        };
      } else {
        url = `${cleanBaseUrl}/chat/completions`;
        options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              { role: "system", content: "Expert data scientist. Output strictly valid JSON object with 'data' key. No markdown." },
              { role: "user", content: promptText }
            ],
            response_format: { type: "json_object" },
            max_tokens: 4096,
            temperature: 0.8,
          }),
        };
      }

      setStatus(`Generating ${datasetSize} rows...`);
      
      const response = await fetch(url, options);
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `HTTP ${response.status}`);
      }

      const result = await response.json();
      let rawText = "";

      if (activeProvider.type === "google") {
        rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      } else {
        rawText = result.choices?.[0]?.message?.content;
      }

      if (rawText) {
        try {
          const jsonText = rawText.replace(/```json\n?|```/g, "").trim();
          
          let parsed;
          try {
            parsed = JSON.parse(jsonText);
          } catch (firstParseErr) {
            const objectMatch = jsonText.match(/\{.*\}/s);
            if (objectMatch) {
              parsed = JSON.parse(objectMatch[0]);
            } else {
              const arrayMatch = jsonText.match(/\[\s*\{.*\}\s*\]/s);
              if (arrayMatch) {
                parsed = JSON.parse(arrayMatch[0]);
              } else {
                throw firstParseErr;
              }
            }
          }
          
          let dataArray = [];
          if (Array.isArray(parsed)) {
            dataArray = parsed;
          } else if (parsed.data && Array.isArray(parsed.data)) {
            dataArray = parsed.data;
          } else {
             const firstArray = Object.values(parsed).find(v => Array.isArray(v));
             if (firstArray) {
               dataArray = firstArray;
             } else {
               const matchesSchema = propertyKeys.every(k => k in parsed);
               if (matchesSchema) dataArray = [parsed];
               else throw new Error("Output contains no valid dataset array.");
             }
          }
          
          setGeneratedData(dataArray.slice(0, datasetSize));
          setStatus(dataArray.length < datasetSize ? `Partial Success (${dataArray.length}/${datasetSize})` : "Success!");
        } catch (e) {
          console.error("Parse Error:", e, "Raw text:", rawText);
          throw new Error("Model failed to return valid JSON data. Try again or check console.", { cause: e });
        }
      } else {
        throw new Error("No output returned from provider.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setStatus("Error");
    } finally {
      setIsGenerating(false);
    }
  };

  return { isGenerating, generatedData, status, error, handleGenerate, setStatus, setError };
};

export default useGeneration;
