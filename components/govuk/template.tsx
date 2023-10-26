"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { MainWrapper, WidthContainer } from "@/components/govuk/grid";
import Header, {
  HeaderContent,
  HeaderLink,
  HeaderLogo,
  HeaderLogotype,
} from "@/components/govuk/header";
import Navigation, {
  NavigationItem,
} from "@/components/govuk/header/navigation";

type Slottable<MainSlot extends string, InnerSlot extends string> =
  | (Partial<Record<MainSlot, ReactNode>> & Partial<Record<InnerSlot, never>>)
  | (Partial<Record<InnerSlot, ReactNode>> & Partial<Record<MainSlot, never>>);

type HeaderSlots = Slottable<"header", "service" | "nav">;

type MainSlots = Slottable<"main", "beforeContent" | "children">;

type TemplateSlot = "bodyStart" | "skipLink" | "footer" | "bodyEnd";

export type TemplateProps = Partial<Record<TemplateSlot, ReactNode>> &
  HeaderSlots &
  MainSlots & {
    showLogin?: boolean;
  };

export default async function Template({
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
  showLogin = true,
}: TemplateProps) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
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
          {(service || nav) && (
            <HeaderContent>
              <div className="govuk-service-row">
                {service}
                {showLogin ? (
                  user ? (
                    <NavigationItem href="/logout">Sign out</NavigationItem>
                  ) : (
                    <NavigationItem href="/login">Sign in</NavigationItem>
                  )
                ) : null}
              </div>
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
