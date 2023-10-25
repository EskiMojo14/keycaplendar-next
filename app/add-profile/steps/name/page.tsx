import type { Metadata } from "next";
import { cookies } from "next/headers";
import ProfileNameStep from "./form";
import Template from "@/components/govuk/template";
import { profilePaths } from "@/constants/cookies";

export const metadata: Metadata = {
  title: "Add profile",
};

export default function ProfileName() {
  return (
    <Template>
      <ProfileNameStep defaultValue={cookies().get(profilePaths.name)?.value} />
    </Template>
  );
}
