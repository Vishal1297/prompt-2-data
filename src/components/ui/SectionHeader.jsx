const SectionHeader = ({ icon: Icon, title, color = "text-indigo-500" }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`p-2 rounded-lg bg-white shadow-sm border border-slate-100 ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>
  </div>
);

export default SectionHeader;
