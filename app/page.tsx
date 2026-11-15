import Figures from "@/components/Figures";
import Hero from "@/components/Hero";
import Materials from "@/components/Materials";
import SheetHeader from "@/components/SheetHeader";
import TitleBlock from "@/components/TitleBlock";

export default function Home() {
  return (
    <div className="sheet min-h-screen">
      <SheetHeader />
      <main>
        <Hero />
        <Figures />
        <Materials />
        <TitleBlock />
      </main>
    </div>
  );
}
