import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ReelSection from "@/components/ReelSection";
import WorkGrid from "@/components/WorkGrid";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <div className="rec-bar" aria-hidden />
      <div className="scanlines" aria-hidden />
      <Navigation />
      <main>
        <Hero />
        <ReelSection />
        <WorkGrid />
        <ContactSection />
      </main>
    </>
  );
}
