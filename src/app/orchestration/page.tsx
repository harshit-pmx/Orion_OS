import OrchestrationFlow from "@/components/flows/OrchestrationFlow";

export default function OrchestrationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Orchestration</h1>
      <OrchestrationFlow />
    </div>
  );
}
