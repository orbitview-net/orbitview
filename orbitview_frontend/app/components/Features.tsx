"use client";

import { Card } from "@/components/ui/card";

const features = [
  {
    title: "AI-Powered Digital Twins",
    description: "Get personalized mentorship through advanced AI clones of top students",
  },
  {
    title: "Semantic Search",
    description: "Find exactly what you're looking for with our intelligent search system",
  },
  {
    title: "Elite Network",
    description: "Connect with students from the world's most prestigious institutions",
  },
];

export function Features() {
  return (
    <section className="py-16 bg-orbit-dark/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why OrbitView?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 bg-orbit-dark/50 border-orbit-primary/20">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}