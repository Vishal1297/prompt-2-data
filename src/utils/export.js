const convertToCSV = (arr) => {
  if (!arr || !arr.length) return "";
  const keys = Object.keys(arr[0]);
  const escapeCsv = (str) => `"${String(str).replace(/"/g, '""')}"`;
  const header = keys.join(",");
  const rows = arr.map((obj) => keys.map((k) => escapeCsv(obj[k])).join(","));
  return [header, ...rows].join("\n");
};

export const handleDownload = (generatedData, exportFormat, coreTopic, setStatus, setError) => {
  if (!generatedData) return;
  
  console.log(`Starting export as ${exportFormat}...`);
  setStatus(`Exporting ${exportFormat.toUpperCase()}...`);

  try {
    let content, mimeType, extension;
    
    if (exportFormat === "csv") {
      content = convertToCSV(generatedData);
      mimeType = "text/csv;charset=utf-8;";
      extension = "csv";
    } else {
      content = JSON.stringify(generatedData, null, 2);
      mimeType = "application/json;charset=utf-8;";
      extension = "json";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    const safeTopic = (coreTopic || "dataset")
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
      
    link.href = url;
    link.setAttribute("download", `${safeTopic}_${Date.now()}.${extension}`);
    
    document.body.appendChild(link);
    link.click();
    
    // Cleanup with slight delay to ensure browser captures the click
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setStatus("Export Complete");
    }, 100);

  } catch (err) {
    console.error("Export Error:", err);
    setError("Failed to generate download file.");
    setStatus("Export Failed");
  }
};
