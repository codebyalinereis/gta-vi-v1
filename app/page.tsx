import Shell from "@/components/Shell";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Duo from "@/components/Duo";
import MapExplorer from "@/components/MapExplorer";
import RadioSection from "@/components/RadioSection";
import EasterEggs from "@/components/EasterEggs";
import Media from "@/components/Media";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <Shell>
      <Hero />
      <Story />
      <Duo />
      <MapExplorer />
      <RadioSection />
      <EasterEggs />
      <Media />
      <Footer />
    </Shell>
  );
}
