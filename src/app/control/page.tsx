'use client';
import Toggle from "@/components/Toggle";
import { useOrionState } from "@/hooks/useOrionState";

/** User control panel: permissions, transparency, export/delete */
export default function ControlPage() {
  const { onboarding, setOnboarding, explain, exportState, reset } = useOrionState(state => ({
    onboarding: state.onboarding,
    setOnboarding: state.setOnboarding,
    explain: state.explain,
    exportState: state.exportState,
    reset: state.reset,
  }));
  const p = onboarding.permissions;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">User Control Panel</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-xl border border-orion-border bg-orion-panel/60 p-5">
          <div className="font-semibold">Transparency & Explainability</div>
          <div className="mt-2 text-sm">
            <div className="rounded border border-orion-border p-3">
              <div className="font-semibold">How Orion decided (rules tree)</div>
              <ul className="list-disc ml-5">
                <li>Respect focus windows and buffers</li>
                <li>Avoid conflicts in existing schedule</li>
                <li>Require preview for high-risk actions (messages/env)</li>
              </ul>
              <div className="text-orion-sub mt-2 text-xs">Signals summary: {JSON.stringify(explain?.used || { focus: onboarding.preferences.focusWindows })}</div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="btn btn-ghost" onClick={exportState}>Export Data</button>
            <button className="btn btn-ghost ml-2" onClick={() => { if (confirm("Delete demo data?")) reset(); }}>Delete Demo Data</button>
          </div>
        </div>

        <div className="rounded-xl border border-orion-border bg-orion-panel/60 p-5">
          <div className="font-semibold">Privacy & Permissions</div>
          <div className="mt-3 space-y-3">
            <Toggle label="Calendar Writes" checked={p.calendar} onChange={(v) => setOnboarding({ permissions: { ...p, calendar: v } })} />
            <Toggle label="Document Writes" checked={p.documents} onChange={(v) => setOnboarding({ permissions: { ...p, documents: v } })} />
            <Toggle label="Email Drafts" checked={p.emails} onChange={(v) => setOnboarding({ permissions: { ...p, emails: v } })} />
            <Toggle label="Sensors" checked={p.sensors} onChange={(v) => setOnboarding({ permissions: { ...p, sensors: v } })} />
          </div>
        </div>
      </div>
    </div>
  );
}
