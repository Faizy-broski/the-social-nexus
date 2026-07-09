import HeroSection from "@/components/home/Hero";
import LetsMake from "@/components/home/LetsMake";
import ProductShowcaseSection from "@/components/home/ProjectShowCase";
import ServicesSection from "@/components/home/Services";
import WebPresenceSection from "@/components/home/WebPresence";
import WhyChooseUsHorizontal from "@/components/home/WhyChooseUs";
import TechnologySection from "@/components/home/Technology";
import ThreeSteps from "@/components/home/ThreeSteps";
import Image from "next/image";
import PortfolioSection from "@/components/home/Portfolio";

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
    <LetsMake />
  </>
)}
