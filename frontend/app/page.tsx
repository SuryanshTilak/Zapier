
import { Appbar } from "@/Components/Appbar";
import { Hero } from "@/Components/Hero";
import { HeroVideo } from "@/Components/HeroVideo";


export default function Home() {
  return (
    <main className="pb-48">
    <Appbar />
    <Hero />
    <div className="pt-8">
      <HeroVideo />
    </div>
</main>
  );
}
