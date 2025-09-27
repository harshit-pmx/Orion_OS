'use client';
import { useState } from "react";
import { useOrionState } from "../../hooks/useOrionState";
import Stepper from "../Stepper";

/** Goal → plan → mark steps done */
export default function GoalsFlow() {
  const { goals, addGoal, toggleStep } = useOrionState(state => ({ goals: state.goals, addGoal: state.addGoal, toggleStep: state.toggleStep }));
  const [text, setText] = useState("");
  const [createdId, setCreatedId] = useState<string | null>(null);

  const create = () => {
    if (!text.trim()) return;
    const id = addGoal(text);
    setCreatedId(id);
    setText("");
  };

  const goal = goals.find((g) => g.id === createdId) || (goals.length > 0 ? goals[goals.length - 1] : null);

  return (
    <div className="rounded-xl border border-orion-border bg-orion-panel/60 p-5">
      <div className="font-bold text-lg">Goals → Plans → Execution</div>
      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 px-3 py-2 rounded-md bg-black/40 border border-orion-border"
          placeholder="Enter a goal…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && create()}
        />
        <button className="btn btn-primary" onClick={create}>Create</button>
      </div>

      {goal && (
        <div className="mt-4">
          <div className="font-semibold">{goal.title}</div>
          <Stepper steps={goal.steps.map((s) => s.title)} current={goal.steps.filter((x) => x.done).length -1} />
          <ul className="mt-3 space-y-2">
            {goal.steps.map((st) => (
              <li key={st.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-orion-red" checked={st.done} onChange={() => toggleStep(goal.id, st.id)} />
                {st.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
