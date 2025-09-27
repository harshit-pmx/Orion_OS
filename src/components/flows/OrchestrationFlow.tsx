'use client';
import { useState } from "react";
import { useOrionState } from "../../hooks/useOrionState";
import Modal from "../Modal";

interface OrchestrationPlanStep {
  app: string;
  action: string;
  details: Record<string, any>;
}

interface ModalState {
  title: string;
  plan: OrchestrationPlanStep[];
}

/** Orchestration preview → confirm with visual progress */
export default function OrchestrationFlow() {
  const { addEvent, addTask, setExplain, onboarding } = useOrionState(state => ({
    addEvent: state.addEvent,
    addTask: state.addTask,
    setExplain: state.setExplain,
    onboarding: state.onboarding
  }));

  const [modal, setModal] = useState<ModalState | null>(null);
  const [progress, setProgress] = useState(0);

  const run = () => {
    const plan: OrchestrationPlanStep[] = [
      { app: "calendar",  action: "createEvent", details: { title: "Study Sprint", start: new Date(), end: new Date(Date.now() + 2 * 3600e3) } },
      { app: "documents", action: "createNote",  details: { title: "Sprint Notes", body: "Objective, Plan, Review" } },
      { app: "messages",  action: "draftEmail",  details: { to: "study-partner@example.com", subject: "Study Sprint Invite", body: "Proposed time attached." } },
      { app: "env",       action: "setFocus",    details: { lights: "warm-dim", phone: "DND" } }
    ];
    setModal({ title: "Preview Orchestration", plan });
  };

  const confirm = () => {
    if (!modal) return;
    setProgress(0);
    const steps = [...modal.plan];
    const tick = () => {
      if (!steps.length) {
        setTimeout(() => {
          setModal(null);
          alert("Orchestration complete.");
          setProgress(0);
        }, 300);
        return;
      }
      const s1 = steps.shift();
      if (s1?.app === "calendar") addEvent(s1.details);
      if (s1?.app === "documents") addTask(s1.details.title);
      
      setExplain({
        ts: new Date().toISOString(),
        rules: ["Checked permissions", "Applied focus windows", "Created calendar event", "Prepared notes"],
        used: { connectors: Object.keys(onboarding.permissions).filter((k) => onboarding.permissions[k as keyof typeof onboarding.permissions]) }
      });

      setProgress((p) => Math.min(100, p + (100 / modal.plan.length)));
      setTimeout(tick, 300);
    };
    tick();
  };

  return (
    <div className="rounded-xl border border-orion-border bg-orion-panel/60 p-5">
      <div className="font-bold text-lg">Task Orchestration</div>
      <p className="text-sm text-orion-sub mt-1">Coordinate actions across calendar • docs • messages • environment with preview → confirm.</p>
      <div className="mt-3 flex gap-2">
        <button className="btn btn-primary" onClick={run}>Run “Plan Study Sprint”</button>
        <button className="btn btn-ghost" onClick={() => alert("Nothing to undo in this demo. Use Control → Export/Delete for data ops.")}>Undo (demo)</button>
      </div>

      <Modal open={!!modal} title={modal?.title || ''} onClose={() => { setModal(null); setProgress(0); }}>
        {modal?.plan.map((p, i) => (
          <div key={i} className="flex items-start justify-between border-b border-orion-border/60 py-2">
            <div>
              <div className="font-semibold">{p.app} • {p.action}</div>
              <div className="text-orion-sub text-sm">{JSON.stringify(p.details, (key, value) => key === 'start' || key === 'end' ? new Date(value).toLocaleTimeString() : value)}</div>
            </div>
            <span className="px-2 py-1 rounded text-xs bg-white/10 border border-white/20">preview</span>
          </div>
        ))}
        <div className="mt-3 h-2 bg-black/30 rounded"><div className="h-2 rounded bg-orion-red transition-all" style={{ width: `${progress}%` }} /></div>
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary" onClick={confirm}>Confirm</button>
          <button className="btn btn-ghost" onClick={() => { setModal(null); setProgress(0); }}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
