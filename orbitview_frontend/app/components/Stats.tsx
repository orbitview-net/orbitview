"use client";

import { Users, Star, School } from "lucide-react";

const stats = [
  {
    label: "Active Users",
    value: "10,000+",
    icon: Users,
    description: "Students using OrbitView"
  },
  /*{
    label: "Average Rating",
    value: "4.9",
    icon: Star,
    description: "From verified mentees"
  },*/
  {
    label: "Universities",
    value: "50+",
    icon: School,
    description: "Top institutions worldwide"
  }
];

export function Stats() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center p-6 rounded-2xl bg-orbit-dark/30 border border-orbit-primary/10 backdrop-blur-sm"
              >
                <div className="p-3 rounded-full bg-orbit-primary/10 mb-4">
                  <Icon className="w-6 h-6 text-orbit-primary" />
                </div>
                <div className="text-4xl font-bold text-orbit-white mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-orbit-secondary mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground text-center">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}