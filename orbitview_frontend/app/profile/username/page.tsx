import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Linkedin,
  Calendar,
  Building2,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { format, formatDistance } from "date-fns";
import { Profile, Experience } from "@/app/types/profile";

// This is temporary dummy data - replace with actual API call
const dummyProfile: Profile = {
  id: 1,
  user: {
    id: 2,
    username: "tomzhang20",
    first_name: "Tom",
    last_name: "Zhang",
    date_joined: "2025-03-12T01:07:14Z",
  },
  date_of_birth: "2008-04-06",
  byline: "Founding Engineer @ OrbitView | I love people and helping them out",
  profile_pic: "http://127.0.0.1:8000/profile_pics/1728766936544.jpg",
  membership: "C",
  website: "https://www.tomzhang.info/",
  linkedin: "https://www.linkedin.com/in/tom-zhang-485341274/",
  external_links: null,
  experiences: [
    {
      title: "Founding Engineer",
      type: "WORK",
      employment_type: "SELF_EMPLOYED",
      company: {
        id: 2,
        logo: "http://127.0.0.1:8000/company-logos/orbitview.jpg",
        description:
          "OrbitView empowers professionals to create AI-powered versions of themselves, sharing their expertise effortlessly.",
        website: "https://orbitview.net",
        type: "CORP",
      },
      start_date: "2024-07-25",
      end_date: null,
    },
    {
      title: "Head of Engineering Department",
      type: "CLUB",
      employment_type: "FREELANCE",
      company: {
        id: 3,
        logo: "http://127.0.0.1:8000/company-logos/ehss_sci_soc.jpg",
        description: "Here for Haig STEM Opportunities, Labs, & Contest Help",
        website: "https://earlhaigsciencesociety.com/",
        type: "CLUB",
      },
      start_date: "2024-06-12",
      end_date: null,
    },
  ],
};

function ExperienceCard({ experience }: { experience: Experience }) {
  const duration = experience.end_date
    ? formatDistance(
        new Date(experience.start_date),
        new Date(experience.end_date)
      )
    : formatDistance(new Date(experience.start_date), new Date());

  return (
    <Card className="p-6 bg-orbit-dark/50 border-orbit-primary/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-orbit-dark/30">
          <Image
            src={experience.company.logo}
            alt={experience.company.description}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{experience.title}</h3>
          <p className="text-orbit-secondary">
            {experience.company.description}
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {format(new Date(experience.start_date), "MMM yyyy")} -{" "}
              {experience.end_date
                ? format(new Date(experience.end_date), "MMM yyyy")
                : "Present"}
            </span>
            <span className="mx-1">•</span>
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <a
              href={experience.company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-orbit-secondary hover:text-orbit-primary transition"
            >
              <Globe className="w-4 h-4" />
              Website
            </a>
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <Building2 className="w-4 h-4" />
              {experience.employment_type.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  // In a real app, fetch profile data based on username
  const profile = dummyProfile;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orbit-dark via-orbit-primary/10 to-orbit-secondary/10 pt-24">
      <div className="container mx-auto px-4">
        <Card className="p-8 bg-orbit-dark/50 border-orbit-primary/20">
          <div className="flex items-start gap-6">
            <div className="relative w-32 h-32">
              <Image
                src={profile.profile_pic}
                alt={`${profile.user.first_name} ${profile.user.last_name}`}
                fill
                className="rounded-xl object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold">
                    {profile.user.first_name} {profile.user.last_name}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    @{profile.user.username}
                  </p>
                </div>
                <Button className="bg-orbit-primary hover:bg-orbit-primary/90">
                  Connect
                </Button>
              </div>

              <p className="mt-4 text-lg">{profile.byline}</p>

              <div className="flex items-center gap-4 mt-6">
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orbit-secondary hover:text-orbit-primary transition"
                >
                  <Globe className="w-5 h-5" />
                  Website
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orbit-secondary hover:text-orbit-primary transition"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                <span className="text-sm text-muted-foreground">
                  Joined{" "}
                  {format(new Date(profile.user.date_joined), "MMMM yyyy")}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <div className="space-y-4">
            {profile.experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
