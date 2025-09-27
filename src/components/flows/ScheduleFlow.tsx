'use client';
import { useState } from "react";
import { useOrionState } from "../../hooks/useOrionState";

/** Intelligent scheduling: propose → accept/decline/reschedule */
const fmt = (d: Date | string) => new Date(d).toLocaleString([], { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });

interface Slot {
  start: Date;
  end: Date;
}

export default function ScheduleFlow() {
  const { proposeSlots, addEvent } = useOrionState(state => ({ proposeSlots: state.proposeSlots, addEvent: state.addEvent }));
  const [slots, setSlots] = useState<Slot[]>([]);

  const propose = () => setSlots(proposeSlots({ duration: 90 }));

  return (
    <div className="rounded-xl border border-orion-border bg-orion-panel/60 p-5">
      <div className="font-bold text-lg">Intelligent Scheduling</div>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={propose}>Propose 90-min Slots</button>
      </div>
      <div className="mt-3 grid sm:grid-cols-2 gap-3">
        {slots.map((slot, i) => (
          <div key={i} className="rounded-lg border border-orion-border p-3">
            <div className="font-semibold">{fmt(slot.start)} → {fmt(slot.end)}</div>
            <div className="mt-2 flex gap-2">
              <button className="btn btn-primary" onClick={() => { addEvent({ title: "Focus Block", start: slot.start, end: slot.end }); alert("Added to simulated calendar"); setSlots([]); }}>Accept</button>
              <button className="btn btn-ghost" onClick={() => { alert("Declined slot"); setSlots(slots.filter(s => s !== slot)); }}>Decline</button>
              <button className="btn btn-ghost" onClick={() => {
                const later = new Date(slot.start.getTime() + 60 * 60000);
                const duration = slot.end.getTime() - slot.start.getTime();
                const end = new Date(later.getTime() + duration);
                addEvent({ title: "Rescheduled Block", start: later, end });
                alert("Rescheduled + added");
                setSlots([]);
              }}>Reschedule +1h</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
