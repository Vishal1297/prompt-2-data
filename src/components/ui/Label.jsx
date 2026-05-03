const Label = ({ children, info }) => (
  <div className="flex items-center justify-between mb-2">
    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-0.5">
      {children}
    </label>
    {info && <span className="text-[10px] text-slate-400 font-medium">{info}</span>}
  </div>
);

export default Label;
