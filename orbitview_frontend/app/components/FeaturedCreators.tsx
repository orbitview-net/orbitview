"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Linkedin } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const featuredCreators = [
  {
    name: "Tom Zhang",
    username: "tomzhang20",
    university: "Columbia University",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    byline:
      "Founding Engineer @ OrbitView | I love people and helping them out",
    website: "https://www.tomzhang.info/",
    linkedin: "https://www.linkedin.com/in/tom-zhang-485341274/",
    membership: "Creator",
  },
  {
    name: "Sarah Chen",
    username: "sarahchen",
    university: "Harvard University",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    byline: "AI Researcher | Teaching Assistant | Competitive Programmer",
    website: "https://example.com",
    linkedin: "https://linkedin.com",
    membership: "Creator",
  },
  {
    name: "Emily Zhang",
    username: "emilyzhang",
    university: "University of Waterloo",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    byline: "Software Engineer | Open Source Contributor | Math Enthusiast",
    website: "https://example.com",
    linkedin: "https://linkedin.com",
    membership: "Creator",
  },
];

export function FeaturedCreators() {
  const router = useRouter();

  return (
    <section className="py-16 bg-orbit-dark/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Student Creators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCreators.map((creator) => (
            <Card
              key={creator.name}
              className="bg-orbit-dark/50 border-orbit-primary/20"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold truncate">
                      {creator.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      @{creator.username}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orbit-primary/20 text-orbit-secondary">
                        {creator.membership}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    {creator.byline}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    {creator.university}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Link
                    href={creator.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orbit-secondary hover:text-orbit-primary transition"
                  >
                    <Globe className="w-4 h-4" />
                  </Link>
                  <Link
                    href={creator.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orbit-secondary hover:text-orbit-primary transition"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Link>
                  <div className="flex-1" />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-orbit-secondary hover:bg-orbit-secondary/90"
                    onClick={() => router.push("/profile/username/")}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
