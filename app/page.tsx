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
import IndustriesMarketSection from "./components/IndustriesMarketSection";



export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <VisionSection />
      <LayersSection />
      <JasuBrainSection />
      <EmergenceEngineSection />
      <IndustriesMarketSection />
      <AutonomousWorkersSection />

    </main>
  );
}
