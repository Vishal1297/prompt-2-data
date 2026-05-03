import { Layout } from "lucide-react";

const SelectField = ({ options, ...props }) => (
  <div className="relative">
    <select
      {...props}
      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 cursor-pointer transition-all"
    >
      {options.map((opt) => (
        <option key={opt.value || opt} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
      <Layout className="w-4 h-4" />
    </div>
  </div>
);

export default SelectField;
