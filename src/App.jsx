import { useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { siteConfig } from "./data/siteConfig";
import { memories } from "./data/memories";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import StoryIntro from "./components/StoryIntro";
import MemoryTimeline from "./components/MemoryTimeline";
import PhotoGallery from "./components/PhotoGallery";
import ReasonsSection from "./components/ReasonsSection";
import LoveLetter from "./components/LoveLetter";
import SurpriseSection from "./components/SurpriseSection";
import FinalSection from "./components/FinalSection";
import Navigation from "./components/Navigation";
import FloatingHearts from "./components/FloatingHearts";
import CursorGlow from "./components/CursorGlow";
import MusicController from "./components/MusicController";
import BirthdayCountdown from "./components/BirthdayCountdown";
import EasterEgg from "./components/EasterEgg";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    const birthday = new Date(siteConfig.birthdayDate + "T00:00:00");
    const now = new Date();
    if (now < birthday) {
      setShowCountdown(true);
    }
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-dark">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!loading && !showCountdown && (
        <>
          {siteConfig.effects.floatingHearts && <FloatingHearts />}
          {siteConfig.effects.cursorGlow && <CursorGlow />}
          <Navigation />
          <MusicController />

          <main>
            <Hero />
            <StoryIntro />
            <MemoryTimeline memories={memories} />
            <PhotoGallery />
            <ReasonsSection />
            <LoveLetter />
            <SurpriseSection />
            <FinalSection />
          </main>

          <EasterEgg />
        </>
      )}

      {!loading && showCountdown && <BirthdayCountdown />}
    </div>
  );
}
