'use client';
import GoalsFlow from "@/components/flows/GoalsFlow";
import ScheduleFlow from "@/components/flows/ScheduleFlow";
import Toggle from "@/components/Toggle";
import sources from "@/data/mockSources.json";
import { useState } from "react";
import { useOrionState } from "@/hooks/useOrionState";

/** Life OS demos: goals, scheduling, knowledge, cross-device sync, insights */
export default function LifeOSPage() {
  const { devices, toggleDevice, insightsOptIn, setInsightsOptIn, insights } = useOrionState(state => ({
    devices: state.devices,
    toggleDevice: state.toggleDevice,
    insightsOptIn: state.insightsOptIn,
    setInsightsOptIn: state.setInsightsOptIn,
    insights: state.insights,
  }));
  const [q, setQ] = useState("");
  const [ans, setAns] = useState<{ text: string; sources: string[] } | null>(null);

  const ask = () => {
    const hit = sources.find((x) => x.title.toLowerCase().includes("history")) || sources[0];
    setAns({ text: `Structured answer: ${hit.snippets.slice(0, 2).join(" • ")}`, sources: [hit.title] });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Life OS</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <GoalsFlow />
        <ScheduleFlow />
      </div>

      <div className="rounded-xl border border-orion-border bg-orion-panel/60 p-5">
        <div className="font-bold text-lg">Adaptive Knowledge Assistant</div>
        <div className="mt-3 flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-md bg-black/40 border border-orion-border"
            placeholder="Ask a question…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask()}
          />
          <button className="btn btn-primary" onClick={ask}>Ask</button>
        </div>
        {ans && (
          <div className="mt-3 rounded border border-orion-border p-3">
            <div className="text-sm">{ans.text}</div>
            <div className="text-xs text-orion-sub mt-1">Simulated sources: {ans.sources.join(", ")}</div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-orion-border bg-orion-panel/60 p-5">
          <div className="font-bold text-lg">Cross-Device Sync</div>
          <div className="mt-3 space-y-3">
            {(Object.keys(devices) as Array<keyof typeof devices>).map((k) => (
              <Toggle key={k} label={k.toUpperCase()} checked={devices[k]} onChange={(on) => toggleDevice(k, on)} sub={`Device is ${devices[k] ? "online" : "offline"}`} />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-orion-border bg-orion-panel/60 p-5">
          <div className="font-bold text-lg">Emotional / Behavioral Insights</div>
          <Toggle label="Opt-in to insights" checked={insightsOptIn} onChange={setInsightsOptIn} sub="Privacy-first: processed locally in this demo." />
          {insightsOptIn && (
            <div className="mt-3 text-sm">
              <div className="text-orion-sub">Mood trend (1–5): {insights.mood.join(" → ")}</div>
              <div className="text-orion-sub">Focus trend (1–5): {insights.focus.join(" → ")}</div>
              <div className="mt-2 rounded border border-orion-border p-2">Privacy Notice: You can disable insights anytime. No data leaves the browser in this demo.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
