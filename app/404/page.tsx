import {
  GridColumn,
  GridRow,
  MainWrapper,
  WidthContainer,
} from "@/components/govuk/grid";
import Header, {
  HeaderLink,
  HeaderLogo,
  HeaderLogotype,
} from "@/components/govuk/header";
import { Body, Heading } from "@/components/govuk/typography";

export default function ForeEauFore() {
  return (
    <>
      <Header app>
        <HeaderLogo>
          <HeaderLink href="/" homepage>
            <HeaderLogotype>KeycapLendar</HeaderLogotype>
          </HeaderLink>
        </HeaderLogo>
      </Header>
      <WidthContainer>
        <MainWrapper size="l">
          <GridRow>
            <GridColumn size="two-thirds">
              <Heading size="l">Page not found</Heading>
              <Body>If you typed the web address, check it is correct.</Body>
              <Body>
                If you pasted the web address, check you copied the entire
                address.
              </Body>
            </GridColumn>
          </GridRow>
        </MainWrapper>
      </WidthContainer>
    </>
  );
}
