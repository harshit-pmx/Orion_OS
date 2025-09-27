'use client';
import content from "@/data/content.json";
import Modal from "@/components/Modal";
import { useState } from "react";

interface ModalState {
  title: string;
  body: string;
}

/** Future vision timeline (Now → Next → Later) with preview stubs */
export default function VisionPage() {
  const [modal, setModal] = useState<ModalState | null>(null);
  const sections = [
    { label: "Now", items: content.roadmap.now },
    { label: "Next", items: content.roadmap.next },
    { label: "Later", items: content.roadmap.later }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Future Vision Mode</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {sections.map((sec, i) => (
          <div key={i} className="rounded-xl border border-orion-border bg-orion-panel/60 p-5">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orion-red"></span><h3 className="font-semibold">{sec.label}</h3></div>
            <ul className="mt-2 text-orion-sub">
              {sec.items.map((it, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <span>• {it}</span>
                  <button className="btn btn-ghost text-xs" onClick={() => setModal({ title: `Preview: ${it}`, body: "Micro-prototype stub executed." })}>Try Preview</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Modal open={!!modal} title={modal?.title || ''} onClose={() => setModal(null)}>
        <div className="text-sm">This preview triggers a small, contained interaction indicating how the feature would feel in Orion.</div>
        <div className="mt-3"><button className="btn btn-primary" onClick={() => setModal(null)}>Close</button></div>
      </Modal>
    </div>
  );
}
