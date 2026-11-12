import type { Metadata } from "next";
import AboutUsPage from "@/components/about/AboutUsPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Social Nexus: 12+ years building custom websites, apps and digital marketing for businesses in the UK, USA and Pakistan.",
  alternates: { canonical: "/about-us" },
};

export default function Page() {
  return <AboutUsPage />;
}
