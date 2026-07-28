import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AnQa Theatre",
    template: "%s | AnQa Theatre",
  },
  description:
    "AnQa is a multilingual theatre group creating performances across cultures.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
