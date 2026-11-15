import Figures from "@/components/Figures";
import Hero from "@/components/Hero";
import Materials from "@/components/Materials";
import Notes from "@/components/Notes";
import SheetHeader from "@/components/SheetHeader";
import TitleBlock from "@/components/TitleBlock";

export default function Home() {
  return (
    <div className="sheet min-h-screen">
      <SheetHeader />
      <main>
        <Hero />
        <Figures />
        <Notes />
        <Materials />
        <TitleBlock />
      </main>
    </div>
  );
}
