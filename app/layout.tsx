import CssBaseline from "@mui/material/CssBaseline";
import type {} from "@mui/material/themeCssVarsAugmentation";
import "./globals.scss";
import {
  InitColorScheme,
  ColorSchemeProvider,
  ThemeRegistry,
} from "@/components/color-scheme";
import JSEnabled from "@/components/govuk/js-enabled";

export const metadata = {
  title: "Keycaplendar",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-mui-color-scheme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Martian+Mono&family=Josefin+Slab:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body>
        <InitColorScheme />
        <JSEnabled />
        <ThemeRegistry options={{ key: "mui", prepend: true }}>
          <ColorSchemeProvider>
            <CssBaseline />
            <main>{children}</main>
          </ColorSchemeProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
