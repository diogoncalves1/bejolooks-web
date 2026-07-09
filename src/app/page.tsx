import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Features from "@/components/features";
import OutfitShowcase from "@/components/outfit-showcase";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <OutfitShowcase />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
