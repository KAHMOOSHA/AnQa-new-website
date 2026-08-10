import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import { MotionProvider } from "./components/MotionProvider";
import "./globals.css";

const themeBootstrapScript = `
  try {
    const savedTheme = localStorage.getItem("anqa-theme");
    document.documentElement.dataset.theme = savedTheme === "light" ? "light" : "dark";
  } catch {
    document.documentElement.dataset.theme = "dark";
  }
`;

export const metadata: Metadata = {
  title: {
    default: "AnQa Theatre",
    template: "%s | AnQa Theatre",
  },
  description:
    "AnQa is a multilingual theatre group creating performances across cultures.",
  icons: {
    icon: "/anqa_favicon.svg",
    shortcut: "/anqa_favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
