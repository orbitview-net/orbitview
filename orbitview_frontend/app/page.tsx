"use client";

import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { FeaturedCreators } from "./components/FeaturedCreators";
import { SearchSection } from "./components/SearchSection";
import { Features } from "./components/Features";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orbit-dark via-orbit-primary/10 to-orbit-secondary/10">
      <Hero />
      <Stats />
      <FeaturedCreators />
      <SearchSection />
      <Features />
    </main>
  );
}