import type { Metadata } from "next";
import { cookies } from "next/headers";
import AddProfileForm from "./form";
import Template from "@/components/govuk/template";
import { profilePaths } from "@/constants/cookies";

export const metadata: Metadata = {
  title: "Add profile",
};

export default function AddProfile() {
  const cookieStore = cookies();
  return (
    <Template>
      <AddProfileForm
        initialValues={{
          name: cookieStore.get(profilePaths.name)?.value,
        }}
      />
    </Template>
  );
}
