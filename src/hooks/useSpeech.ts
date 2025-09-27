'use client';
import { useRef, useState } from "react";

/** Web Speech API hook (graceful fallback when unsupported) */
export default function useSpeech() {
  const [recording, setRecording] = useState(false);
  const stopRef = useRef(() => {});
  const has =
    typeof window !== "undefined" &&
    ("webkitSpeechRecognition" in window || "SpeechRecognition" in window);

  const start = ({ onText, lang = "en-US" }: { onText: (text: string) => void, lang?: string }) => {
    if (!has) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = lang;
    rec.interimResults = false;
    rec.onresult = (e: any) => onText?.(e.results[0][0].transcript || "");
    rec.onend = () => setRecording(false);
    setRecording(true);
    rec.start();
    stopRef.current = () => {
      try { rec.abort(); } catch {}
      setRecording(false);
    };
  };
  const stop = () => stopRef.current?.();
  return { hasSTT: !!has, recording, start, stop };
}
