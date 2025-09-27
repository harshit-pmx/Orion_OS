'use client';
import { useState, useRef } from "react";
import Stepper from "../Stepper";
import Toggle from "../Toggle";
import content from "../../data/content.json";
import { useOrionState } from "../../hooks/useOrionState";

/** 3-step onboarding + summary (goals → preferences → permissions → confirm) */
export default function OnboardingFlow() {
  const s = useOrionState();
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState(s.onboarding.goals.length ? s.onboarding.goals : content.onboarding.goals);
  const [prefs, setPrefs] = useState({ ...content.onboarding.preferences, ...s.onboarding.preferences });
  const [perm, setPerm] = useState({ ...content.onboarding.permissions, ...s.onboarding.permissions });
  const goalInputRef = useRef<HTMLInputElement>(null);

  const steps = ["Goals", "Preferences", "Permissions", "Summary"];
  const addGoal = (g: string) => g && !goals.includes(g) && setGoals((v) => [...v, g]);
  const removeGoal = (i: number) => setGoals((v) => v.filter((_, idx) => idx !== i));

  const confirm = () => {
    s.completeOnboarding({ goals, preferences: prefs, permissions: perm });
    goals.forEach((g) => {
      // Avoid adding duplicate goals if onboarding is re-run
      if (!s.goals.some(existingGoal => existingGoal.title === g)) {
        s.addGoal(g);
      }
    });
    alert("Onboarding saved. Explore Dashboard.");
  };

  return (
    <div className="rounded-xl border border-orion-border bg-orion-panel/60 p-5">
      <Stepper steps={steps} current={step} />

      {step === 0 && (
        <div className="mt-4">
          <div className="flex gap-2 flex-wrap">
            {content.onboarding.goals.map((g) => (
              <button key={g} className="pill hover:text-white" onClick={() => addGoal(g)}>{g}</button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input ref={goalInputRef} className="flex-1 px-3 py-2 rounded-md bg-black/40 border border-orion-border" placeholder="Add a custom goal…" />
            <button
              className="btn btn-primary"
              onClick={() => {
                if (goalInputRef.current) {
                  const v = goalInputRef.current.value.trim();
                  addGoal(v);
                  goalInputRef.current.value = "";
                }
              }}
            >
              Add
            </button>
          </div>
          <ul className="mt-3 space-y-2">
            {goals.map((g, i) => (
              <li key={i} className="flex items-center justify-between bg-black/30 border border-orion-border rounded-md px-3 py-2">
                <span>{g}</span><button className="btn btn-ghost" onClick={() => removeGoal(i)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === 1 && (
        <div className="mt-4 space-y-3">
          <div>
            <div className="font-semibold">Focus Windows</div>
            <div className="flex gap-2 flex-wrap mt-2">
              {prefs.focusWindows.map((fw, idx) => <span className="pill" key={idx}>{fw}</span>)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            Notification style
            <select
              className="px-3 py-2 rounded-md bg-black/40 border border-orion-border"
              value={prefs.notificationStyle}
              onChange={(e) => setPrefs((p) => ({ ...p, notificationStyle: e.target.value as any }))}
            >
              <option value="gentle">Gentle</option>
              <option value="balanced">Balanced</option>
              <option value="assertive">Assertive</option>
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-4 space-y-3">
          <Toggle label="Calendar Writes" checked={perm.calendar} onChange={(v) => setPerm((p) => ({ ...p, calendar: v }))} sub="Create/edit events with undo" />
          <Toggle label="Document Writes" checked={perm.documents} onChange={(v) => setPerm((p) => ({ ...p, documents: v }))} sub="Create notes, outlines" />
          <Toggle label="Email Drafts" checked={perm.emails} onChange={(v) => setPerm((p) => ({ ...p, emails: v }))} sub="Draft messages for review" />
          <Toggle label="Sensors" checked={perm.sensors} onChange={(v) => setPerm((p) => ({ ...p, sensors: v }))} sub="Location or environment automations" />
        </div>
      )}

      {step === 3 && (
        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-orion-border p-3">
            <div className="font-semibold">Summary</div>
            <div className="text-sm text-orion-sub mt-2">Goals: {goals.join(" • ")}</div>
            <div className="text-sm text-orion-sub">Focus: {prefs.focusWindows.join(", ")} • Notifications: {prefs.notificationStyle}</div>
            <div className="text-sm text-orion-sub">Permissions: {Object.entries(perm).map(([k, v]) => `${k}:${v ? "on" : "off"}`).join(" • ")}</div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-ghost" onClick={() => setStep(0)}>Edit</button>
            <button className="btn btn-primary" onClick={confirm}>Confirm</button>
          </div>
        </div>
      )}

      <div className="mt-5 flex justify-between">
        <button className="btn btn-ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</button>
        <button className="btn btn-primary" onClick={() => setStep((s) => Math.min(3, s + 1))} disabled={step === 3}>Next</button>
      </div>
    </div>
  );
}
