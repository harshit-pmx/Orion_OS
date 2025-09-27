import OnboardingFlow from "@/components/flows/OnboardingFlow";

export default function OnboardingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Onboarding</h1>
      <OnboardingFlow />
    </div>
  );
}
