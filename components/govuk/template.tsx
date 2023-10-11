import type { ReactNode } from "react";
import { MainWrapper, WidthContainer } from "@/components/govuk/grid";
import Header, {
  HeaderContent,
  HeaderLink,
  HeaderLogo,
  HeaderLogotype,
} from "@/components/govuk/header";
import Navigation from "@/components/govuk/header/navigation";

type Slottable<MainSlot extends string, InnerSlot extends string> =
  | (Partial<Record<MainSlot, ReactNode>> & Partial<Record<InnerSlot, never>>)
  | (Partial<Record<InnerSlot, ReactNode>> & Partial<Record<MainSlot, never>>);

type HeaderSlots = Slottable<"header", "service" | "nav">;

type MainSlots = Slottable<"main", "beforeContent" | "children">;

type TemplateSlot = "bodyStart" | "skipLink" | "footer" | "bodyEnd";

export type TemplateProps = Partial<Record<TemplateSlot, ReactNode>> &
  HeaderSlots &
  MainSlots;

export default function Template({
  bodyStart,
  skipLink,
  header,
  service,
  nav,
  main,
  beforeContent,
  children,
  footer,
  bodyEnd,
}: TemplateProps) {
  return (
    <>
      {bodyStart}
      {skipLink}
      {header ?? (
        <Header app>
          <HeaderLogo>
            <HeaderLink href="/" homepage>
              <HeaderLogotype>KeycapLendar</HeaderLogotype>
            </HeaderLink>
          </HeaderLogo>
          {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
          {(service || nav) && (
            <HeaderContent>
              {service}
              {nav && <Navigation>{nav}</Navigation>}
            </HeaderContent>
          )}
        </Header>
      )}
      {main ?? (
        <WidthContainer>
          {beforeContent}
          <MainWrapper size="l">{children}</MainWrapper>
        </WidthContainer>
      )}
      {footer}
      {bodyEnd}
    </>
  );
}
