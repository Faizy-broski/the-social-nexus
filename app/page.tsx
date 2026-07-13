import dynamic from "next/dynamic";
import HeroSection from "@/components/home/Hero";

// Hero renders above the fold and needs to be interactive immediately, so
// it stays a static import. Everything below it is off-screen on load —
// splitting each into its own chunk keeps their JS (GSAP, Embla, canvas)
// out of the initial bundle instead of blocking first paint/TTI for
// sections the user hasn't scrolled to yet.
const WhyChooseUsHorizontal = dynamic(() => import("@/components/home/WhyChooseUs"));
const WebPresenceSection = dynamic(() => import("@/components/home/WebPresence"));
const ServicesSection = dynamic(() => import("@/components/home/Services"));
const ProductShowcaseSection = dynamic(() => import("@/components/home/ProjectShowCase"));
const TechnologySection = dynamic(() => import("@/components/home/Technology"));
const PortfolioSection = dynamic(() => import("@/components/home/Portfolio"));
const ThreeSteps = dynamic(() => import("@/components/home/ThreeSteps"));


export default function Home() {
  return (
  <>
    <HeroSection />
    <WhyChooseUsHorizontal />
    <WebPresenceSection />
    <ServicesSection />
    <ProductShowcaseSection />
    <TechnologySection />
    <PortfolioSection />
    <ThreeSteps />
  </>
)}
