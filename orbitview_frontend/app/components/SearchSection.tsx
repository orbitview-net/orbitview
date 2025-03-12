"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const dummySearchResults = [
  {
    name: "Alex Thompson",
    username: "alexthompson",
    university: "MIT",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    expertise: ["Machine Learning", "Robotics", "Computer Vision"],
    rating: 4.9,
    totalMentees: 156
  },
  {
    name: "Priya Patel",
    username: "priyapatel",
    university: "Stanford University",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    expertise: ["Quantum Computing", "Physics", "Mathematics"],
    rating: 4.8,
    totalMentees: 89
  },
  {
    name: "David Kim",
    username: "davidkim",
    university: "UC Berkeley",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    expertise: ["Software Architecture", "System Design", "Web Development"],
    rating: 4.7,
    totalMentees: 234
  }
];

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Find Your Mentor</h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by topic, university, or expertise..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-orbit-primary/20 bg-orbit-dark/50 focus:outline-none focus:ring-2 focus:ring-orbit-primary"
              value={searchQuery}
              onChange={handleSearch}
            />

            {showResults && (
              <div className="absolute w-full mt-2 bg-orbit-dark/95 rounded-2xl border border-orbit-primary/20 shadow-lg backdrop-blur-sm overflow-hidden">
                {dummySearchResults.map((result) => (
                  <div
                    key={result.username}
                    className="p-4 hover:bg-orbit-primary/10 transition-colors border-b border-orbit-primary/10 last:border-0"
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={result.image}
                        alt={result.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{result.name}</h3>
                          <span className="text-xs text-orbit-secondary">★ {result.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{result.university}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {result.expertise.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-orbit-primary/20 text-orbit-secondary"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Mentored {result.totalMentees} students
                        </p>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-orbit-secondary hover:bg-orbit-secondary/90"
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}