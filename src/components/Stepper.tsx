interface StepperProps {
  steps: string[];
  current: number;
}

export default function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              i <= current ? "bg-orion-red text-white" : "bg-black/40 border border-orion-border"
            }`}
          >
            {i + 1}
          </div>
          <span className={`text-sm ${i === current ? "font-semibold" : "text-orion-sub"}`}>{s}</span>
          {i < steps.length - 1 && <span className="w-6 h-[1px] bg-orion-border"></span>}
        </div>
      ))}
    </div>
  );
}
