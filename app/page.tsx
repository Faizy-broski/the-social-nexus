import HeroSection from "@/components/home/Hero";
import WhyChooseUsHorizontal from "@/components/home/WhyChooseUs";
import WebPresenceSection from "@/components/home/WebPresence";
import ServicesSection from "@/components/home/Services";
import ProductShowcaseSection from "@/components/home/ProjectShowCase";
import TechnologySection from "@/components/home/Technology";
import PortfolioSection from "@/components/home/Portfolio";
import ThreeSteps from "@/components/home/ThreeSteps";

// These used to be next/dynamic() imports to keep their JS (GSAP, Embla,
// canvas) out of the initial bundle. But next/dynamic is React.lazy() +
// Suspense under the hood, and with no `loading` fallback each section
// streamed in as a SEPARATE flush after the initial HTML shell — on a
// fast connection that gap is invisible, but under real mobile network
// conditions it can take seconds, during which the page is only as tall
// as Hero. When the streamed chunk finally arrives, the page jumps from
// ~1 viewport to full height in one frame: a ~1.0 CLS score (confirmed
// via a Playwright repro with throttled network — body height jumped
// 1600px -> 11300px at the exact moment of the layout-shift entry).
// Static imports render everything in the same initial pass as Hero,
// so there's no fallback state and nothing to jump.

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
