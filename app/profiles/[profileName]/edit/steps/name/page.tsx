import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProfileNameStep from "./form";
import Template from "@/components/govuk/template";
import { getProfileByName } from "@/logic/cached";

interface Props {
  params: {
    profileName: string;
  };
}

export function generateMetadata({ params: { profileName } }: Props): Metadata {
  return {
    title: `Edit profile: ${profileName}`,
  };
}

export default async function ProfileName({ params: { profileName } }: Props) {
  const profile = await getProfileByName(decodeURIComponent(profileName));
  if (!profile) {
    return notFound();
  }
  return (
    <Template>
      <ProfileNameStep defaultValue={profile.name} />
    </Template>
  );
}
