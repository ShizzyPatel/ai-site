import Section from "./components/Section";
import Container from "./components/Container";
import OnView from "./components/OnView";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import VisionSection from "./components/VisionSection";
import LayersSection from "./components/LayersSection";
import JasuBrainSection from "./components/JasuBrain";
import EmergenceEngineSection from "./components/EmergenceEngineSection";
import AutonomousWorkersSection from "./components/AutonomousWorkersSection";
import InteractiveProductRealitySection from "./components/InteractiveProductRealitySection";
import PathsToMarketSection from "./components/PathsToMarketSection";
import CompetitiveComparisonSection from "./components/CompetitiveComparisonSection";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";
import CorporateBrain from "./components/CorporateBrain";


export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <InteractiveProductRealitySection />
      <VisionSection />
      <LayersSection />
      <JasuBrainSection />
      <CorporateBrain />
      <EmergenceEngineSection />
      <AutonomousWorkersSection />
      <TeamSection /> 
      <ContactSection />

    </main>
  );
}
