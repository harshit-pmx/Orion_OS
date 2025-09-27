interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  sub?: string;
}

export default function Toggle({ checked, onChange, label, sub }: ToggleProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 accent-orion-red" />
      <div>
        <div className="font-semibold">{label}</div>
        {sub && <div className="text-sm text-orion-sub">{sub}</div>}
      </div>
    </label>
  );
}
