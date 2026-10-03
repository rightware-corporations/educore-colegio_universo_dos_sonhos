import { LandingHeader } from "@/components/landing/LandingHeader";
import { IntroHeroSection } from "@/components/landing/IntroHeroSection";
import { ManifestoSection } from "@/components/landing/ManifestoSection";
import { AprenderSection } from "@/components/landing/AprenderSection";
import { FuturoSection } from "@/components/landing/FuturoSection";

export function LandingFoundationPage() {
  return (
    <main className="min-h-screen bg-colus-paper text-colus-text">
      <LandingHeader />
      <IntroHeroSection />
      <ManifestoSection />
      <AprenderSection />
      <FuturoSection />
    </main>
  );
}
