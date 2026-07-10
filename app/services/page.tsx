"use client";

import { useEffect, useRef } from "react";
import Link from "next/link"
import { ArrowUp } from "lucide-react";

type Point = { x: number; y: number; vx: number; vy: number; radius: number };

const services = [

{
number:
"1",
title: "Software\nDevelopment", description: "We are a leading software development agency delivering custom"
},{
number:"2",
title: "Web\nDevelopment", description: "We provide end-to-end custom web development solutions designed..."
},{
number:"3", title:
"Mobile App\nDevelopment", description: "We are a leading mobile app development agency delivering ..."
},{
number:"4",
title: 
"Generative AI\nDevelopment", description: "The Social Nexus is a forward-thinking AI development agency delivering..."
},{
number:"5",
title:
"Digital\nMarketing", description: "The Social Nexus delivers powerful digital marketing and SEO services..."
},{
number:"6",
title: "Social Media\nDesign", description: "The Social Nexus creates stunning social media visuals, branded templates..."
},{
number:"7",
title: "Automation", description: "The Social Nexus delivers intelligent business automation solutions that..."
},{
number:"8",
title: "Voicebots", description: "The Social Nexus builds sophisticated voicebot and conversational AI systems..."
},{
number:"9",
title: "Chatbots", description: "The Social Nexus builds intelligent, conversational chatbots that engage customers..."
},{
number:"10",
title: "ERP & CRM Implementation", description: "The Social Nexus delivers expert ERP and CRM implementation services that transform..."
},{
number:"11", title: "Brand Identity & Logo\nDesign", description: "We craft brand identities that communicate purpose, personality, and positioning..."
},{
number:"12", title: "Saas\nDevelopment", description: "We are a leading SaaS development agency delivering custom SaaS products.."
},{
number:"13", title: "Maintenance and Support", description: "We are a leading software maintenance and support agency delivering..."
},{
number:"14", title: "Salesforce Development &\nConsulting", description: "We are a leading Salesforce development and consulting agency..."
},{
number:"15", title: "Cloud Migration & Cloud\nOperations", description: "We are a leading cloud migration and cloud operations agency delivering..."}
];

function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0;
    let points: Point[] = [];
    let width = 0;
    let height = 0;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      // More nodes
      const count = Math.max(
        65,
        Math.min(140, Math.floor((width * height) / 12000))
      );

      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,

        // Faster motion
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,

        radius: Math.random() * 1.35 + 0.75,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const point of points) {
        if (!reducedMotion) {
          point.x += point.vx;
          point.y += point.vy;

          if (point.x < -20) point.x = width + 20;
          if (point.x > width + 20) point.x = -20;

          if (point.y < -20) point.y = height + 20;
          if (point.y > height + 20) point.y = -20;
        }
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const distance = Math.hypot(
            points[i].x - points[j].x,
            points[i].y - points[j].y
          );

          // More visible connections
          const maxDistance = width < 700 ? 145 : 210;

          if (distance < maxDistance) {
            context.beginPath();
            context.moveTo(points[i].x, points[i].y);
            context.lineTo(points[j].x, points[j].y);

            context.strokeStyle = `rgba(205,208,211,${
              0.24 * (1 - distance / maxDistance)
            })`;

            context.lineWidth = 1;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(
          points[i].x,
          points[i].y,
          points[i].radius,
          0,
          Math.PI * 2
        );

        context.fillStyle = "rgba(235,237,239,.65)";
        context.fill();
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

export default function Page() {
  const goNext = (index: number) => document.getElementById(`service-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#151515] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,.13)_68%,rgba(0,0,0,.28)_100%)]" />
      <section className="relative z-10 mx-auto pl-20 pr-6 sm:pl-25">
      <NetworkBackground />
        <div className="grid items-center gap-10 py-20 lg:grid-cols-[.9fr_1.6fr] lg:gap-24 lg:py-24">
          <div>
            <p className="mb-5 text-xl font-semibold sm:text-xl">Services</p>
            <h1 className="max-w-[580px] text-6xl font-semibold leading-[.98] tracking-[-.055em]">Solution we<br />provide</h1>
          </div>
          <p className="max-w-md text-lg font-medium leading-[1.45] tracking-[-.025em] text-white/50">
            With every single one of our clients we bring forth a deep passion for <strong className="font-semibold text-white">creative problem solving innovations</strong> forward thinking brands boundaries
          </p>
        </div>
        <div className="border-t border-white/15">
          {services.map((service, index) => (
            <article id={`service-${index}`} key={service.title} className="group grid grid-cols-[42px_1fr_auto] gap-x-5 border-b border-white/15 py-10 sm:grid-cols-[90px_1fr_auto] lg:grid-cols-[100px_1.1fr_1.5fr_auto] lg:items-center lg:gap-8">
              <span className="text-2xl font-semibold text-white/35 group-hover:text-white/80 sm:text-3xl">{service.number}</span>
              <h2 className="whitespace-pre-line text-3xl font-semibold leading-tight tracking-[-.03em]">{service.title}</h2>
              <p className="col-start-2 mt-6 max-w-[690px] text-lg font-medium leading-relaxed text-white/50 lg:col-start-auto lg:mt-0 lg:text-md">{service.description}</p>
              <button type="button" onClick={() => goNext((index + 1) % services.length)} className="row-span-2 self-center rounded-full p-3 text-white/50 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:row-span-1" aria-label={`Go to next service after ${service.title.replace("\n", " ")}`}>
                <ArrowUp strokeWidth={2.4} className="size-8 sm:size-10" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#111111] pl-20 pr-6 sm:pl-25 mt-20 py-10 text-white">
              <div className="mx-auto flex max-w-[1500px] flex-col items-center text-center">
                <p className="text-[30px] font-normal leading-none tracking-[-0.03em] sm:text-[40px] lg:text-5xl">
                  Have you project in mind?
                </p>
      
                <h2 className="mt-6 max-w-[1200px] text-[52px] font-bold uppercase leading-[0.9] tracking-[-0.055em] sm:text-[76px] lg:text-8xl">
                  <span className="block">Let&apos;s make</span>
      
                  <span className="mt-4 block">
                    <span className="bg-gradient-to-r from-[#079CC7] via-[#58A676] to-[#C5C51A] bg-clip-text text-transparent">
                      Something
                    </span>{" "}
                    great
                  </span>
      
                  <span className="mt-4 block">Together!</span>
                </h2>
      
                <Link
                  href="/contact"
                  className="group mt-7 sm:w-40 sm:h-40 flex size-[190px] items-center justify-center rounded-full bg-[#3FB2C0] transition duration-300 hover:scale-105 hover:bg-[#52C0CC]"
                >
                  <span className="flex items-center gap-3 text-[18px] font-semibold leading-[1.45] sm:text-[20px]">
                    <span>
                      Connect
                      <br />
                      With Us
                    </span>
                  </span>
                </Link>
              </div>
            </section>
    </main>
  );
}