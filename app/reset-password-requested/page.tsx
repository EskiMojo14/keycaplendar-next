import Template from "@/components/govuk/template";
import { Body, Heading } from "@/components/govuk/typography";

export default function ResetPasswordRequested() {
  return (
    <Template>
      <Heading size="l">Now check your email</Heading>
      <Body>
        We&apos;ve sent you an email with a link to reset your password.
      </Body>
    </Template>
  );
}
