import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Linkedin, Calendar, Building2 } from "lucide-react";
import Image from "next/image";
import { format, formatDistance } from "date-fns";
import { Profile, Experience } from "@/app/types/profile";
import { ChatInterface } from "@/app/chat/ChatInterace";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { backendServer } from "@/data/backendServer";

async function getProfile(username: string): Promise<Profile> {
  const res = await fetch(`${backendServer}/profile/${username}/`, {
    next: { revalidate: 60 }, // Revalidate every minute
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}

interface ExperienceCardProps {
  experience: Experience;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
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
          <br />
          <p className="text-orbit-secondary">
            {experience.company.description}
          </p>
        </div>
      </div>
    </Card>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const profile = await getProfile(params.username);

  return {
    title: `${profile.user.first_name} ${profile.user.last_name} - Profile`,
    description:
      profile.byline || "Discover the professional profile of this user.",
    openGraph: {
      title: `${profile.user.first_name} ${profile.user.last_name} - Profile`,
      description:
        profile.byline || "Discover the professional profile of this user.",
      url: `https://your-site.com/profile/${params.username}`, // Replace with your actual URL
      images: [
        {
          url: profile.profile_pic, // Profile picture as OG image
          width: 800,
          height: 800,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.user.first_name} ${profile.user.last_name} - Profile`,
      description:
        profile.byline || "Discover the professional profile of this user.",
      images: [profile.profile_pic],
    },
  };
}

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const profile = await getProfile(params.username);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orbit-dark via-orbit-primary/10 to-orbit-secondary/10 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
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
                        {format(
                          new Date(profile.user.date_joined),
                          "MMMM yyyy"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              <div>
                <h2 className="text-2xl font-bold mb-6">Experience</h2>
                <div className="space-y-4">
                  {profile.experiences.map((experience, index) => (
                    <ExperienceCard key={index} experience={experience} />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-[600px]">
              <ChatInterface profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
