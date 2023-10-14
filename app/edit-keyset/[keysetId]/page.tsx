import { HeaderService } from "@/components/govuk/header";
import Template from "@/components/govuk/template";

export default function AddKeyset() {
  return (
    <Template
      service={<HeaderService href="#">Add keyset</HeaderService>}
    ></Template>
  );
}
