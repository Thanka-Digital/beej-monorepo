import { Inter } from "next/font/google";
import { Provider } from "@/components/provider";
import "./global.css";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Beej",
    default: "Beej - Modular UI Design System",
  },
  description:
    "A responsive, highly customizable UI design system and scaffolding package.",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
