import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/logout-button";
import { DisplayTable } from "@/components/display";
import Button from "@/components/govuk/button";
import { MainWrapper, WidthContainer } from "@/components/govuk/grid";
import { selectKeysets } from "@/logic/drizzle";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const entries = await selectKeysets;

  return (
    <WidthContainer>
      <MainWrapper size="l">
        {user ? (
          <LogoutButton />
        ) : (
          <Link href="/login" style={{ textDecoration: "none" }}>
            <Button>Log in</Button>
          </Link>
        )}
        <DisplayTable data={entries} />
      </MainWrapper>
    </WidthContainer>
  );
}
