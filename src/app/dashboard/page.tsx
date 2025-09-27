'use client';
import { useState } from "react";
import InputBar from "@/components/InputBar";
import Carousel from "@/components/Carousel";
import Card from "@/components/Card";
import { useOrionState } from "@/hooks/useOrionState";
import sources from "@/data/mockSources.json";
import content from "@/data/content.json";
import Link from "next/link";

interface Output {
  type: 'success' | 'info' | 'answer';
  text: string;
  sources?: string[];
}

/** Multimodal dashboard: text/voice/image + proactive cards + quick modules */
export default function DashboardPage() {
  const { addGoal, proposeSlots, setExplain, onboarding, suggestions, addTask } = useOrionState(state => ({
    addGoal: state.addGoal,
    proposeSlots: state.proposeSlots,
    setExplain: state.setExplain,
    onboarding: state.onboarding,
    suggestions: state.suggestions,
    addTask: state.addTask,
  }));
  const [output, setOutput] = useState<Output[]>([]);
  const [chips] = useState(["Plan a 2h deep work", "Propose 3 slots", "What is UPSC Ch.3?"]);

  // very simple intent router
  const router = (text: string) => {
    const t = text.toLowerCase();
    if (/plan|deep work|goal/.test(t)) {
      const id = addGoal("2-hr Deep Work");
      setOutput((o) => [{ type: "success", text: `Created goal with id ${id}. Check Life OS → Goals.` }, ...o]);
    } else if (/slot|schedule|meeting|propose/.test(t)) {
      const slots = proposeSlots({ duration: 60 });
      setOutput((o) => [{ type: "info", text: `Proposed: ${slots.map(x => new Date(x.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })).join(", ")}` }, ...o]);
      setExplain({ ts: new Date().toISOString(), rules: ["Applied focus windows", "Avoided conflicts", "Returned top 3"], used: { focus: onboarding.preferences.focusWindows } });
    } else {
      const src = sources.find(x => x.title.toLowerCase().includes("chapter")) || sources[0];
      setOutput((o) => [{ type: "answer", text: `Answer: ${src.snippets[0]}.`, sources: [src.title] }, ...o]);
    }
  };

  const onSubmit = (text: string, clear: () => void) => { if (!text.trim()) return; router(text); clear?.(); };
  const onQuick: Parameters<typeof InputBar>[0]['onQuick'] = ({ type, action, file }) => {
    if (type === "image") { addTask("Review uploaded image"); setOutput((o) => [{ type: "info", text: "Image ingested. Created task: Review uploaded image." }, ...o]); return; }
    if (action === "plan_deep_work") router("plan deep work");
    if (action === "summarize_doc") router("what is UPSC Ch.3?");
    if (action === "reschedule_block") router("reschedule study block");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Multimodal Dashboard</h1>
      <InputBar onSubmit={onSubmit} onQuick={onQuick} />

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-xl border border-orion-border bg-orion-panel/60 p-4 min-h-[160px]">
          <div className="font-semibold mb-2">Orion Responses</div>
          <div className="space-y-2">
            {output.map((o, i) => (
              <div key={i} className="rounded border border-orion-border px-3 py-2">
                <div className="text-sm">{o.text}</div>
                {o.sources && <div className="text-xs text-orion-sub mt-1">Sources: {o.sources.join(", ")}</div>}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2 flex-wrap">
            {chips.map((c, i) => <button key={i} className="pill hover:text-white" onClick={() => router(c)}>{c}</button>)}
          </div>
        </div>

        <div className="rounded-xl border border-orion-border bg-orion-panel/60 p-4">
          <div className="font-semibold">Proactive</div>
          <ul className="mt-2 space-y-2">
            {[...suggestions, ...content.recommendations].slice(0, 2).map((r) => (
              <li key={r.id || r.title} className="rounded border border-orion-border p-2">
                <div className="text-sm font-semibold">{r.title}</div>
                <div className="text-xs text-orion-sub">{r.reason}</div>
                <div className="mt-2 flex gap-2">
                  <button className="btn btn-primary" onClick={() => { addTask(r.title); alert("Added task."); }}>Accept</button>
                  <button className="btn btn-ghost" onClick={() => alert("Snoozed for later.")}>Snooze</button>
                  <button className="btn btn-ghost" onClick={() => alert("We won't show this again.")}>Never</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Carousel
        title="Quick Modules"
        items={[
          { title: "Goals", subtitle: "Create & track", href: "/life-os" },
          { title: "Scheduler", subtitle: "Propose slots", href: "/life-os" },
          { title: "Knowledge", subtitle: "Ask & cite", href: "/life-os" },
          { title: "Orchestrate", subtitle: "Preview→Confirm", href: "/orchestration" }
        ]}
        renderItem={(it) => (
          <Card
            title={it.title}
            subtitle={it.subtitle}
            actions={<Link className="btn btn-primary" href={it.href}>Open</Link>}
          />
        )}
      />
    </div>
  );
}
