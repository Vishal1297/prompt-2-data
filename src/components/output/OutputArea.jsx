import OutputHeader from "./OutputHeader";
import PreviewTable from "./PreviewTable";
import OutputFooter from "./OutputFooter";

const OutputArea = (props) => {
  const {
    status,
    isGenerating,
    exportFormat,
    setExportFormat,
    generatedData,
    handleDownload,
  } = props;

  return (
    <main className="flex flex-col min-h-[700px]">
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex-1 flex flex-col overflow-hidden">
        <OutputHeader
          status={status}
          isGenerating={isGenerating}
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
        />

        <div className="flex-1 flex flex-col relative overflow-y-auto custom-scrollbar">
          <PreviewTable data={generatedData} />
        </div>

        <OutputFooter
            generatedData={generatedData}
            isGenerating={isGenerating}
            handleDownload={handleDownload}
            exportFormat={exportFormat}
        />
      </div>
      
      <p className="mt-6 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
        Generated data may be inaccurate. Always verify outputs.
      </p>
    </main>
  );
};

export default OutputArea;
