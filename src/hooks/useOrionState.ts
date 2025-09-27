import { create } from "zustand";

interface OnboardingState {
  complete: boolean;
  goals: string[];
  preferences: {
    focusWindows: string[];
    notificationStyle: 'gentle' | 'balanced' | 'assertive';
  };
  permissions: {
    calendar: boolean;
    documents: boolean;
    emails: boolean;
    sensors: boolean;
  };
}

interface DeviceState {
  phone: boolean;
  tablet: boolean;
  desktop: boolean;
}

interface GoalStep {
  id: string;
  title: string;
  done: boolean;
}

interface Goal {
  id: string;
  title: string;
  steps: GoalStep[];
  status: 'active' | 'completed';
}

interface ScheduleEvent {
  id: string;
  title: string;
  start: Date | string;
  end: Date | string;
  location?: string;
}

interface Task {
  id: string;
  title: string;
  done: boolean;
}

interface Suggestion {
  id: string;
  title: string;
  reason: string;
}

interface ExplainTrace {
  ts: string;
  rules: string[];
  used: Record<string, any>;
}

interface Insights {
  mood: number[];
  focus: number[];
}

interface OrionState {
  onboarding: OnboardingState;
  devices: DeviceState;
  goals: Goal[];
  schedule: ScheduleEvent[];
  tasks: Task[];
  suggestions: Suggestion[];
  explain: ExplainTrace | null;
  insightsOptIn: boolean;
  insights: Insights;
}

interface OrionActions {
  save: () => void;
  setOnboarding: (data: Partial<OnboardingState>) => void;
  completeOnboarding: (payload: Partial<Omit<OnboardingState, 'complete'>>) => void;
  toggleDevice: (d: keyof DeviceState, on: boolean) => void;
  addGoal: (title: string) => string;
  toggleStep: (goalId: string, stepId: string) => void;
  proposeSlots: (options?: { duration?: number }) => { start: Date; end: Date }[];
  addEvent: (event: Omit<ScheduleEvent, 'id'>) => string;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  refreshSuggestions: () => void;
  setExplain: (trace: ExplainTrace | null) => void;
  exportState: () => void;
  reset: () => void;
  setInsightsOptIn: (v: boolean) => void;
}

const key = "orion_sim_v2";
const defaultState: OrionState = {
  onboarding: {
    complete: false,
    goals: [],
    preferences: { focusWindows: [], notificationStyle: "gentle" },
    permissions: { calendar: true, documents: false, emails: false, sensors: false }
  },
  devices: { phone: true, tablet: true, desktop: true },
  goals: [],
  schedule: [],
  tasks: [],
  suggestions: [],
  explain: null,
  insightsOptIn: false,
  insights: { mood: [3, 4, 3, 5, 4], focus: [2, 3, 4, 4, 5] }
};

export const useOrionState = create<OrionState & OrionActions>((set, get) => ({
  ...defaultState,
  save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(get()));
    }
  },

  setOnboarding(data) {
    set(s => ({ onboarding: { ...s.onboarding, ...data } }));
    get().save();
  },
  completeOnboarding(payload) {
    set(s => ({ onboarding: { ...s.onboarding, ...payload, complete: true } }));
    get().refreshSuggestions();
    get().save();
  },

  toggleDevice(d, on) {
    set(s => ({ devices: { ...s.devices, [d]: on } }));
    get().save();
  },

  addGoal(title) {
    const id = crypto.randomUUID();
    const steps = planGoal(title);
    set(s => ({ goals: [...s.goals, { id, title, steps, status: "active" }] }));
    get().save();
    return id;
  },
  toggleStep(goalId, stepId) {
    set(s => ({
      goals: s.goals.map(g =>
        g.id === goalId ? { ...g, steps: g.steps.map(st => st.id === stepId ? { ...st, done: !st.done } : st) } : g
      )
    }));
    get().save();
  },

  proposeSlots({ duration = 60 } = {}) {
    const { schedule, onboarding } = get();
    return proposeSchedule({ existing: schedule, focus: onboarding.preferences.focusWindows, durationMins: duration });
  },
  addEvent({ title, start, end, location = "" }) {
    const id = crypto.randomUUID();
    set(s => ({ schedule: [...s.schedule, { id, title, start, end, location }] }));
    get().save();
    return id;
  },

  addTask(title) {
    const id = crypto.randomUUID();
    set(s => ({ tasks: [...s.tasks, { id, title, done: false }] }));
    get().save();
  },
  toggleTask(id) {
    set(s => ({ tasks: s.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t) }));
    get().save();
  },

  refreshSuggestions() {
    const s = get(); const out: Suggestion[] = [];
    if (s.goals.length && !s.tasks.some(t => /weekly review/i.test(t.title)))
      out.push({ id: crypto.randomUUID(), title: "Add weekly goal review", reason: "You have active goals." });
    if (!s.onboarding.permissions.calendar)
      out.push({ id: crypto.randomUUID(), title: "Enable calendar writes", reason: "Orchestration improves with calendar." });
    set({ suggestions: out });
    get().save();
  },
  setExplain(trace) {
    set({ explain: trace });
    get().save();
  },

  exportState() {
    const stateToExport = { ...get() };
    // remove non-serializable or internal properties if any
    const blob = new Blob([JSON.stringify(stateToExport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url;
    a.download = "orion_state.json";
    a.click();
    URL.revokeObjectURL(url);
  },
  reset() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
      location.reload();
    }
  },

  setInsightsOptIn(v) {
    set({ insightsOptIn: v });
    get().save();
  }
}));

function planGoal(title: string): GoalStep[] {
  const base = ["Define success criteria", "Schedule deep-work blocks", "Weekly progress review"];
  if (/UPSC|study|exam/i.test(title)) base.unshift("Create syllabus breakdown", "Set mock test cadence");
  if (/build|orion|v1/i.test(title)) base.unshift("Draft architecture", "Create MVP tasks");
  return base.map(t => ({ id: crypto.randomUUID(), title: t, done: false }));
}

function proposeSchedule({ existing, focus, durationMins }: { existing: ScheduleEvent[], focus: string[], durationMins: number }) {
  const slots = []; const today = new Date(); today.setMinutes(0, 0, 0);
  for (let d = 0; d < 7; d++) {
    for (const fw of (focus.length ? focus : ["06:00-08:00", "20:00-22:00"])) {
      const [s, e] = fw.split("-");
      const day = new Date(today); day.setDate(today.getDate() + d);
      const st = new Date(day); st.setHours(+s.split(":")[0], +s.split(":")[1], 0, 0);
      const en = new Date(day); en.setHours(+e.split(":")[0], +e.split(":")[1], 0, 0);
      const candEnd = new Date(st.getTime() + durationMins * 60000);
      if (candEnd <= en && !existing.some(ev => overlap(st, candEnd, new Date(ev.start), new Date(ev.end))))
        slots.push({ start: st, end: candEnd });
      if (slots.length >= 3) return slots;
    }
  }
  return slots;
}
function overlap(a1: Date, a2: Date, b1: Date, b2: Date) { return a1 < b2 && a2 > b1; }
