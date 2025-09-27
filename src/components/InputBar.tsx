'use client';

import { useState, type ChangeEvent } from "react";
import useSpeech from "../hooks/useSpeech";
import content from "../data/content.json";

interface QuickAction {
  type: 'quick';
  action: string;
}

interface ImageAction {
  type: 'image';
  file?: File;
}

type OnQuickHandler = (action: QuickAction | ImageAction) => void;

interface InputBarProps {
  onSubmit: (text: string, clear: () => void) => void;
  onQuick?: OnQuickHandler;
}

/** Multimodal input: text, voice, image, and quick actions */
export default function InputBar({ onSubmit, onQuick }: InputBarProps) {
  const [text, setText] = useState("");
  const { hasSTT, recording, start, stop } = useSpeech();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQuick?.({ type: "image", file: e.target.files?.[0] });
  };

  return (
    <div className="rounded-xl border border-orion-border bg-orion-panel/60 p-4">
      <div className="flex gap-2 flex-wrap">
        <input
          className="flex-1 min-w-[220px] px-3 py-2 rounded-md bg-black/40 border border-orion-border"
          placeholder='Try: "Plan 2-hr deep work" or "Schedule revision at 7pm"'
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit(text, () => setText(""))}
        />
        <button className="btn btn-primary" onClick={() => onSubmit(text, () => setText(""))}>Send</button>
        <button
          className={`btn ${recording ? "btn-primary" : "btn-ghost"}`}
          onClick={() =>
            recording
              ? stop()
              : (hasSTT
                  ? start({ onText: (t) => { setText(t); setTimeout(() => onSubmit(t, () => setText("")), 50); } })
                  : alert("Speech recognition not supported in this browser."))
          }
        >
          {recording ? "Listening…" : "🎤 Speak"}
        </button>
        <label className="btn btn-ghost cursor-pointer">
          📷 Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </label>
      </div>

      <div className="mt-3 flex gap-2 flex-wrap">
        {content.quickActions.map((q) => (
          <button
            key={q.action}
            className="pill hover:text-white"
            onClick={() => onQuick?.({ type: "quick", action: q.action })}
          >
            {q.label}
          </button>
        ))}
      </div>
    </div>
  );
}
