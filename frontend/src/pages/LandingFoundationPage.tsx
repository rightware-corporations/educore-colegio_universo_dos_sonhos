import { LandingHeader } from "@/components/landing/LandingHeader";
import { IntroHeroSection } from "@/components/landing/IntroHeroSection";
import { ManifestoSection } from "@/components/landing/ManifestoSection";
import { AprenderSection } from "@/components/landing/AprenderSection";
import { FuturoSection } from "@/components/landing/FuturoSection";
import { VidaSection } from "@/components/landing/VidaSection";
import { PertencerSection } from "@/components/landing/PertencerSection";
import { TransformarSection } from "@/components/landing/TransformarSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ContactFooter } from "@/components/landing/ContactFooter";

export function LandingFoundationPage() {
  return (
    <main className="min-h-screen bg-colus-paper text-colus-text">
      <LandingHeader />
      <IntroHeroSection />
      <ManifestoSection />
      <AprenderSection />
      <FuturoSection />
      <VidaSection />
      <PertencerSection />
      <TransformarSection />
      <TestimonialsSection />
      <ContactFooter />
    </main>
  );
}
