"use client";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orbit-secondary via-orbit-primary to-orbit-secondary">
          Connect with Elite Student Creators
        </h1>
        <p className="text-xl text-muted-foreground">
          Access insights from top students at world-renowned institutions through their digital twins
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button size="lg" className="text-lg px-8 bg-orbit-primary hover:bg-orbit-primary/90">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 border-orbit-primary/20 hover:bg-orbit-primary/10">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}