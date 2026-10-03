import { LandingHeader } from "@/components/landing/LandingHeader";
import { IntroHeroSection } from "@/components/landing/IntroHeroSection";
import { ManifestoSection } from "@/components/landing/ManifestoSection";

export function LandingFoundationPage() {
  return (
    <main className="min-h-screen bg-colus-paper text-colus-text">
      <LandingHeader />
      <IntroHeroSection />
      <ManifestoSection />
    </main>
  );
}
