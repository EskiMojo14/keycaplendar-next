import type { Metadata } from "next";
import { cookies } from "next/headers";
import ProfileNameStep from "./form";
import Template from "@/components/govuk/template";

export const metadata: Metadata = {
  title: "Add profile",
};

export default function ProfileName() {
  return (
    <Template>
      <ProfileNameStep defaultValue={cookies().get("profile.name")?.value} />
    </Template>
  );
}
