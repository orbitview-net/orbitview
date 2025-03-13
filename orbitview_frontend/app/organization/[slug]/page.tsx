import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Users, Building2, ExternalLink } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Organization } from "@/app/types/profile";
import { Metadata } from "next";
import { backendServer } from "@/data/backendServer";

/*
const dummyOrganization: Organization = {
  id: 2,
  logo: "${backendServer}/media/company-logos/orbitview.jpg",
  description:
    "OrbitView empowers professionals to create AI-powered versions of themselves, sharing their expertise effortlessly.",
  website: "https://orbitview.net",
  external_links: null,
  type: "CORP",
};
*/

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const profile = await getOrganization(params.slug);

  return {
    title: `${profile.title}`,
    description:
      profile.description ||
      "Discover organizations and companies on OrbitView",
    openGraph: {
      title: `${profile.title}`,
      description:
        profile.description ||
        "Discover organizations and companies on OrbitView",
      // url: `https://your-site.com/profile/organization/${params.slug}`, // Replace with your actual URL
      images: [
        {
          url: profile.logo, // Profile picture as OG image
          width: 800,
          height: 800,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.title}`,
      description:
        profile.description ||
        "Discover the professional profile of this user.",
      images: [profile.logo],
    },
  };
}

async function getOrganization(slug: string): Promise<Organization> {
  const res = await fetch(`${backendServer}/profile/organization/${slug}`, {
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

export default async function OrganizationPage({
  params,
}: {
  params: { slug: string };
}) {
  const organization = await getOrganization(params.slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orbit-dark via-orbit-primary/10 to-orbit-secondary/10 pt-24">
      <div className="container mx-auto px-4">
        <Card className="p-8 bg-orbit-dark/50 border-orbit-primary/20">
          <div className="flex items-start gap-6">
            <div className="relative w-32 h-32">
              <Image
                src={organization.logo}
                alt={organization.description}
                fill
                className="rounded-xl object-cover bg-orbit-dark/30"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold">{organization.title}</h1>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orbit-primary/20 text-orbit-secondary">
                      {organization.type}
                    </span>
                  </div>
                </div>
                <Button className="bg-orbit-primary hover:bg-orbit-primary/90">
                  View Opportunities
                </Button>
              </div>

              <p className="mt-4 text-lg">{organization.description}</p>

              <div className="flex items-center gap-4 mt-6">
                <a
                  href={organization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orbit-secondary hover:text-orbit-primary transition"
                >
                  <Globe className="w-5 h-5" />
                  Website
                </a>
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <Users className="w-5 h-5" />
                  50+ Members
                </span>
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-5 h-5" />
                  Technology
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card className="p-6 bg-orbit-dark/50 border-orbit-primary/20">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-muted-foreground">
              OrbitView is revolutionizing the way knowledge is shared and
              accessed. Our platform enables professionals to create AI-powered
              digital twins of themselves, making their expertise available to
              learners worldwide. Through cutting-edge technology and a
              commitment to educational accessibility, we're building the future
              of personalized mentorship.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
