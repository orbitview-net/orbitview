"use client";

import { Profile } from "@/app/types/profile";
import { useParams } from "next/navigation";

export async function generateStaticParams() {
  const res = await fetch(`http://127.0.0.1:8000/profile/${username}/`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch profile data");
  return res.json();
}

export const Test = async () => {
  const data = await generateStaticParams();

  console.log(data);

  return (
    <div>
      <h2>Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Properly formats JSON */}
    </div>
  );
};
