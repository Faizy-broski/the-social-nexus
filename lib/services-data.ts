import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Activity,
  ArrowUpRight,
  BarChart3,
  Bot,
  BookOpen,
  Brain,
  Building2,
  Cloud,
  Code,
  Contact,
  CreditCard,
  Database,
  FileText,
  Gauge,
  GitMerge,
  Globe,
  GraduationCap,
  Headset,
  ImageIcon,
  Languages,
  Layers,
  LayoutGrid,
  LayoutTemplate,
  Lightbulb,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  Palette,
  PenTool,
  PhoneCall,
  PhoneOutgoing,
  PiggyBank,
  Plug,
  Puzzle,
  RefreshCw,
  Rocket,
  Search,
  Server,
  Settings2,
  Share2,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Terminal,
  UserCheck,
  Users,
  Video,
  Workflow,
  Wrench,
} from "lucide-react";

export type ServiceFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/** A heading rendered as before + optional gradient-highlighted phrase + after. */
export type HeadingParts = {
  before: string;
  highlight?: string;
  after?: string;
};

export type ServiceDetail = {
  slug: string;
  number: string;
  /** Hero title, one entry per line. */
  title: string[];
  heroDescription: string;
  image: string;
  features: ServiceFeature[];
  overviewFocus: string;
  overviewTeam: string;
  /** Overrides the generic "Building High-Performance X..." overview heading when present. */
  overviewHeading?: HeadingParts;
  /** Overrides the generic overview paragraph when present. */
  overviewParagraph?: string;
  /** Overrides the generic "Comprehensive X Solutions" cards heading when present. */
  cardsHeading?: HeadingParts;
};

export const services: ServiceDetail[] = [
  {
    slug: "software-development",
    number: "01",
    title: ["Software", "Development"],
    heroDescription:
      "We are a leading software development agency delivering custom, enterprise-grade, and scalable software solutions. We help businesses build secure, high-performance applications that streamline operations, reduce manual workload, and drive measurable growth in the digital era. Partner with The Social Nexus to turn your idea into reliable, production-ready software.",
    image: "/services/1.jpg",
    overviewFocus: "software development",
    overviewTeam: "engineers, architects, and QA specialists",
    overviewHeading: {
      before: "Building Reliable ",
      highlight: "Software Backed",
      after: " by Industry Experience",
    },
    overviewParagraph:
      "The Social Nexus stands as a trusted software development agency with over 20+ years of collective experience in delivering custom software solutions tailored to business goals. Our team of expert developers, architects, and strategists builds secure, scalable, and high-performance software using modern tools, agile methodologies, and best practices. We focus on software that is reliable, efficient, and built to support long-term growth. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to build software that is secure, maintainable, and ready to scale.",
    features: [
      {
        icon: Code,
        title: "Custom Software Development",
        description:
          "Custom software development focuses on building bespoke applications engineered around your exact business processes, goals, and growth plans rather than off-the-shelf limitations.",
      },
      {
        icon: Building2,
        title: "Enterprise Software Solutions",
        description:
          "Enterprise software solutions deliver robust, large-scale systems that handle complex workflows, multiple departments, and high user volumes without compromising performance.",
      },
      {
        icon: Plug,
        title: "API Development & Integration",
        description:
          "API development and integration connect your software with third-party platforms, internal tools, and data sources, enabling smooth, automated communication across your entire tech stack.",
      },
      {
        icon: Lightbulb,
        title: "Software Architecture & Consulting",
        description:
          "Software architecture and consulting help you plan scalable, maintainable systems from the ground up, reducing technical debt and future development costs.",
      },
      {
        icon: RefreshCw,
        title: "Legacy System Modernisation",
        description:
          "Legacy system modernisation focuses on upgrading outdated applications with modern frameworks, improving speed, security, and compatibility with current technologies.",
      },
      {
        icon: Database,
        title: "Database Design & Development",
        description:
          "Database design and development ensure your data is structured, secure, and optimised for fast retrieval, supporting reporting, analytics, and day-to-day operations.",
      },
      {
        icon: Terminal,
        title: "DevOps & CI/CD",
        description:
          "DevOps and CI/CD services automate build, test, and deployment pipelines, helping your team ship updates faster with fewer errors and greater reliability.",
      },
      {
        icon: ShieldCheck,
        title: "Quality Assurance & Testing",
        description:
          "Quality assurance and testing covers functional, performance, and security testing to ensure every release is stable, bug-free, and ready for real-world use.",
      },
    ],
  },
  {
    slug: "web-development",
    number: "02",
    title: ["Web", "Development"],
    heroDescription:
      "We provide end-to-end custom web development solutions designed to help businesses grow online. From responsive website design to robust back-end development, our team ensures your website is fast, secure, and user-friendly. Whether you need a startup site, an enterprise platform, or an eCommerce solution, we simplify the process and deliver websites that engage users and drive results.",
    image: "/services/2.jpg",
    overviewFocus: "web development",
    overviewTeam: "developers, designers, and strategists",
    overviewHeading: {
      before: "Building Digital Experiences ",
      highlight: "Backed by 10+ Years",
      after: " of Expertise",
    },
    overviewParagraph:
      "The Social Nexus brings over 20 years of collective experience in web development and design, creating digital experiences that define the future. Every pixel we place, every line of code we write, is a step towards perfection. We don't just build websites — we architect digital universes. Our team of expert developers and designers serves clients across the UK, USA, and Pakistan, combining deep technical expertise with creative excellence to deliver websites that are fast, secure, accessible, and conversion-optimised. We use agile development methodologies, the latest technologies, and proven best practices to ensure every project exceeds client expectations and delivers measurable business results.",
    features: [
      {
        icon: LayoutTemplate,
        title: "Front-End Web Development",
        description:
          "Front-end development ensures your website is visually engaging and responsive.",
      },
      {
        icon: Server,
        title: "Back-End Web Development",
        description:
          "Our back-end development service manages your website's server side functionality, ensuring secure, efficient data processing and seamless user interaction.",
      },
      {
        icon: Layers,
        title: "Full-Stack Web Development",
        description:
          "Full-stack web development covers both front-end and back-end solutions. We offer complete web solutions, creating functional, responsive, and secure websites.",
      },
      {
        icon: FileText,
        title: "Content Management Systems (CMS)",
        description:
          "CMS development enables easy management of your website content.",
      },
      {
        icon: AppWindow,
        title: "Web Application Development",
        description:
          "We build custom web applications designed for your business needs.",
      },
      {
        icon: Globe,
        title: "WordPress Web Development",
        description:
          "Our WordPress development service creates customizable and easy to manage websites.",
      },
      {
        icon: ShoppingCart,
        title: "E-Commerce Web Development",
        description:
          "E-Commerce development focuses on building online stores.",
      },
      {
        icon: Puzzle,
        title: "Custom Widgets and Plugins Development",
        description:
          "Custom widgets and plugins enhance your website's functionality.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    number: "03",
    title: ["Mobile App", "Development"],
    heroDescription:
      "We are a leading mobile app development agency delivering custom mobile app development, hybrid app development, and cross-platform solutions. We help businesses build engaging, scalable, and high-performance apps that enhance user experience, streamline operations, and drive growth in the digital era. Partner with The Social Nexus to bring your app idea to life.",
    image: "/services/3.jpg",
    overviewFocus: "mobile app development",
    overviewTeam: "developers, designers, and strategists",
    overviewHeading: {
      before: "Building High-Performance ",
      highlight: "Mobile Apps Backed",
      after: " by Industry Experience",
    },
    overviewParagraph:
      "The Social Nexus stands as a trusted mobile app development agency with over 8 years of collective experience in delivering custom mobile solutions tailored to business goals. Our team of expert developers, designers, and strategists crafts user-friendly, scalable, and high-performance apps across Android, iOS, and cross-platform technologies. Using modern tools, agile methodologies, and best practices, we ensure every app not only meets client expectations but also drives engagement, efficiency, and ROI. We focus on building apps that are intuitive, fast, and optimised for real-world usage. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to build mobile applications that are secure, reliable, and ready to support future growth.",
    cardsHeading: {
      before: "Comprehensive ",
      highlight: "Mobile App",
      after: " Solutions",
    },
    features: [
      {
        icon: Smartphone,
        title: "Native Mobile Applications",
        description:
          "Native app development focuses on creating applications designed specifically for iOS and Android, delivering the highest performance and best user experience on each platform.",
      },
      {
        icon: Bot,
        title: "Android Development",
        description:
          "Android development emphasises creating applications specifically for Android devices, leveraging Kotlin and Java to deliver feature-rich, optimised experiences.",
      },
      {
        icon: Puzzle,
        title: "Custom App Development",
        description:
          "Custom app development focuses on building bespoke applications tailored precisely to your business needs, workflows, and brand identity.",
      },
      {
        icon: AppWindow,
        title: "iOS Development",
        description:
          "iOS development specialises in creating applications designed specifically for the Apple ecosystem — iPhone, iPad, and beyond — with polished, fluid interfaces.",
      },
      {
        icon: Layers,
        title: "Flutter App Development",
        description:
          "Flutter app development leverages Google's framework to create visually stunning, high-performance applications for both iOS and Android from a single codebase.",
      },
      {
        icon: Share2,
        title: "Cross-Platform App Development",
        description:
          "Cross-platform development is about designing apps that function beautifully on both iOS and Android, maximising reach while minimising cost.",
      },
      {
        icon: Code,
        title: "React Native Development",
        description:
          "React Native enables us to build near-native mobile experiences using JavaScript, with faster delivery and consistent performance across platforms.",
      },
      {
        icon: Server,
        title: "Backend App Development",
        description:
          "Backend app development specialises in creating robust server-side solutions that ensure efficient data processing and a smooth user experience for your applications.",
      },
    ],
  },
  {
    slug: "generative-ai-development",
    number: "04",
    title: ["Generative AI", "Development"],
    heroDescription:
      "We are a leading generative AI development agency delivering custom AI models, intelligent chatbots, and automation solutions powered by large language models. We help businesses unlock new efficiencies, enhance customer experiences, and innovate faster using cutting-edge AI technology. Partner with The Social Nexus to bring generative AI into your business.",
    image: "/services/4.jpg",
    overviewFocus: "generative AI development",
    overviewTeam: "AI engineers, data scientists, and product strategists",
    overviewHeading: {
      before: "Building ",
      highlight: "Intelligent Solutions",
      after: " Backed by Industry Experience",
    },
    overviewParagraph:
      "The Social Nexus stands as a trusted generative AI development agency with over 8 years of collective technology experience in delivering custom AI solutions tailored to business goals. Our team of expert AI engineers, data specialists, and strategists builds secure, scalable, and high-performing AI systems using modern tools, agile methodologies, and best practices. We focus on generative AI solutions that are practical, accurate, and optimised for real-world business impact. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to build AI systems that are secure, reliable, and ready to support future growth.",
    cardsHeading: {
      before: "Comprehensive AI Development Solutions",
    },
    features: [
      {
        icon: Brain,
        title: "Custom LLM Solutions",
        description:
          "Custom LLM solutions build and fine-tune large language models tailored to your industry, data, and specific business use cases.",
      },
      {
        icon: Bot,
        title: "AI Chatbots & Virtual Assistants",
        description:
          "AI chatbots and virtual assistants automate customer support, lead qualification, and internal workflows through natural, human-like conversations.",
      },
      {
        icon: LineChart,
        title: "Generative AI Integration",
        description:
          "Generative AI integration embeds AI capabilities such as content generation, summarisation, and recommendations directly into your existing software.",
      },
      {
        icon: ImageIcon,
        title: "AI Content & Image Generation",
        description:
          "AI content and image generation produce text, visuals, and creative assets at scale, helping teams move faster on marketing and product needs.",
      },
      {
        icon: SlidersHorizontal,
        title: "AI Model Fine-Tuning",
        description:
          "AI model fine-tuning adapts pre-trained models to your specific data and goals, improving accuracy and relevance for your business context.",
      },
      {
        icon: Database,
        title: "Retrieval-Augmented Generation (RAG) Systems",
        description:
          "Retrieval-augmented generation systems connect AI models with your own knowledge base, ensuring responses are accurate, current, and grounded in your data.",
      },
      {
        icon: Workflow,
        title: "AI Workflow Automation",
        description:
          "AI workflow automation uses generative AI to streamline repetitive business processes, freeing up teams to focus on higher-value work.",
      },
      {
        icon: Lightbulb,
        title: "Generative AI Consulting & Strategy",
        description:
          "Generative AI consulting and strategy help you identify the right use cases, tools, and roadmap to adopt AI responsibly and effectively.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    number: "05",
    title: ["Digital", "Marketing"],
    heroDescription:
      "The Social Nexus delivers powerful digital marketing and SEO services that increase your visibility, drive qualified traffic, and accelerate business growth. With over 20 years of experience in local and national SEO, we provide cost-effective strategies that take your business to the top of search results and maximise your return on marketing investment.",
    image: "/services/5.jpg",
    overviewFocus: "digital marketing and SEO",
    overviewTeam: "strategists, analysts, and content specialists",
    overviewHeading: {
      before: "Growing Businesses Through Digital Marketing for Over 20 Years",
    },
    overviewParagraph:
      "The Social Nexus has been helping businesses grow their digital presence and increase revenue through marketing for over two decades. We know your time is precious, which is why we focus on fast-turnaround, cost-effective strategies that deliver measurable results. Our team of SEO specialists, PPC managers, content strategists, and analytics experts works as an extension of your marketing team, bringing specialist expertise and cutting-edge tools to every campaign. We serve clients across the UK, USA, and Pakistan, from local businesses looking to dominate their area to global brands seeking to scale their digital presence. Our data-driven approach ensures every pound of your marketing budget is working as hard as possible.",
    features: [
      {
        icon: Search,
        title: "Search Engine Optimisation (SEO)",
        description:
          "We boost your organic search rankings through technical SEO, on-page optimisation, content strategy, and high-authority link building — driving sustainable, long-term traffic growth.",
      },
      {
        icon: MapPin,
        title: "Local SEO",
        description:
          "Specialist local SEO services that put your business at the top of local search results, attracting nearby customers and driving footfall to your physical locations.",
      },
      {
        icon: MousePointerClick,
        title: "Pay-Per-Click (PPC) Advertising",
        description:
          "High-ROI Google Ads and Bing Ads campaigns expertly managed to maximise clicks, conversions, and return on ad spend for your business.",
      },
      {
        icon: Share2,
        title: "Social Media Marketing",
        description:
          "Strategic social media marketing across Facebook, Instagram, LinkedIn, and TikTok that builds brand awareness, engages audiences, and drives conversions.",
      },
      {
        icon: PenTool,
        title: "Content Marketing",
        description:
          "Compelling, SEO-optimised content strategies including blog posts, articles, infographics, and video content that attract, engage, and convert your target audience.",
      },
      {
        icon: Mail,
        title: "Email Marketing",
        description:
          "Targeted email marketing campaigns that nurture leads, retain customers, and drive repeat purchases with measurable, data-driven results.",
      },
      {
        icon: BarChart3,
        title: "Analytics & Reporting",
        description:
          "Comprehensive digital marketing analytics and performance reporting that give you clear visibility of ROI and actionable insights for continuous improvement.",
      },
    ],
  },
  {
    slug: "social-media-design",
    number: "06",
    title: ["Social Media", "Design"],
    heroDescription:
      "The Social Nexus creates stunning social media visuals, branded templates, and creative assets that elevate your online presence and drive engagement across all platforms. Our creative team designs scroll-stopping content that captures attention, communicates your brand message, and builds a loyal, engaged following for your business.",
    image: "/services/6.jpg",
    overviewFocus: "social media design",
    overviewTeam: "designers, animators, and content strategists",
    overviewHeading: {
      before: "Creating Social Media Visuals That Elevate Brands and Drive Engagement",
    },
    overviewParagraph:
      "The Social Nexus has been creating compelling social media designs for businesses across the UK, USA, and Pakistan for over 20 years. Our creative team understands both the aesthetic demands and the algorithmic realities of social media — designing content that is not only beautiful but built to perform. We believe that strong social media design is inseparable from strong brand identity. Every post, story, and campaign asset we create is a reflection of your brand, and we work meticulously to ensure consistency, quality, and impact across every piece of content. Whether you need a complete social media visual identity from scratch or ongoing creative support, we bring the creativity, speed, and brand understanding to deliver.",
    features: [
      {
        icon: ImageIcon,
        title: "Social Media Post Design",
        description:
          "Eye-catching, brand-consistent social media post designs for Instagram, Facebook, LinkedIn, Twitter/X, and TikTok that engage your audience and drive interaction.",
      },
      {
        icon: LayoutGrid,
        title: "Social Media Template Systems",
        description:
          "Custom-designed template systems that allow your team to create on-brand social media content quickly and consistently, without needing a designer every time.",
      },
      {
        icon: Video,
        title: "Story & Reel Design",
        description:
          "Dynamic, attention-grabbing Instagram and Facebook Stories and Reels templates designed for maximum impact in the vertical mobile format.",
      },
      {
        icon: LayoutTemplate,
        title: "Cover & Banner Design",
        description:
          "Professionally designed profile covers, channel art, and banner images for all social platforms that make a strong first impression.",
      },
      {
        icon: BarChart3,
        title: "Infographic Design",
        description:
          "Visually compelling infographics that transform complex information into shareable, engaging visual content that drives organic reach.",
      },
      {
        icon: Megaphone,
        title: "Campaign Creative",
        description:
          "Integrated social media campaign creative including hero images, animated posts, carousel designs, and ad creative for paid social campaigns.",
      },
      {
        icon: Lightbulb,
        title: "Brand Content Strategy",
        description:
          "Strategic social media content planning that aligns your visual content with your brand identity, business goals, and audience preferences.",
      },
    ],
  },
  {
    slug: "automation",
    number: "07",
    title: ["Automation"],
    heroDescription:
      "The Social Nexus delivers intelligent business automation solutions that eliminate repetitive tasks, reduce errors, and dramatically increase operational efficiency. We design and implement automated workflows, system integrations, and process automation systems that free your team to focus on what matters most — growing your business.",
    image: "/services/7.jpg",
    overviewFocus: "business automation",
    overviewTeam: "automation engineers and business analysts",
    overviewHeading: {
      before: "Transforming Operations Through ",
      highlight: "Intelligent Automation",
    },
    overviewParagraph:
      "The Social Nexus has been helping businesses automate their operations for over 20 years, delivering measurable improvements in efficiency, accuracy, and scalability. Our automation specialists work closely with your team to map existing processes, identify automation opportunities, and design solutions that deliver rapid return on investment. We serve businesses across the UK, USA, and Pakistan, from SMEs looking to streamline manual tasks to enterprises seeking to automate complex, multi-system workflows. Our approach combines deep technical expertise with a thorough understanding of business operations, ensuring every automation solution we deliver genuinely transforms the way your organisation works and creates sustainable competitive advantage.",
    features: [
      {
        icon: Bot,
        title: "Robotic Process Automation (RPA)",
        description:
          "We deploy software robots that mimic human actions to automate repetitive, rule-based tasks across your applications and systems, dramatically reducing manual effort.",
      },
      {
        icon: Workflow,
        title: "Workflow Automation",
        description:
          "End-to-end workflow automation that connects your tools, systems, and teams — eliminating bottlenecks and ensuring tasks flow seamlessly from initiation to completion.",
      },
      {
        icon: Plug,
        title: "API Integration & Automation",
        description:
          "We integrate disparate systems and automate data flows between platforms, ensuring your business applications work together in perfect harmony.",
      },
      {
        icon: Mail,
        title: "Marketing Automation",
        description:
          "Intelligent marketing automation systems for lead nurturing, email campaigns, social media scheduling, and customer journey automation.",
      },
      {
        icon: FileText,
        title: "Document & Data Automation",
        description:
          "Automated document generation, data extraction, transformation, and reporting systems that save hours of manual data processing.",
      },
      {
        icon: ShoppingCart,
        title: "E-commerce Automation",
        description:
          "Order processing, inventory management, customer communication, and fulfilment automation that scales with your online business.",
      },
      {
        icon: Terminal,
        title: "Custom Automation Solutions",
        description:
          "Bespoke automation solutions designed around your unique business processes, built to integrate seamlessly with your existing technology stack.",
      },
    ],
  },
  {
    slug: "voicebots",
    number: "08",
    title: ["Voicebots"],
    heroDescription:
      "The Social Nexus builds sophisticated voicebot and conversational AI systems that handle phone calls, voice queries, and spoken interactions intelligently and naturally. From automated customer service phone lines to voice-enabled applications, we design voicebot solutions that deliver exceptional spoken experiences and drive operational efficiency.",
    image: "/services/8.jpg",
    overviewFocus: "voicebot development",
    overviewTeam: "conversational AI engineers and voice designers",
    overviewHeading: {
      before: "Building Natural ",
      highlight: "Voice Experiences",
      after: " Backed by Deep AI Expertise",
    },
    overviewParagraph:
      "The Social Nexus combines advanced expertise in speech recognition, natural language understanding, and text-to-speech synthesis to build voicebots that sound natural and perform reliably. Our voice AI specialists design conversation flows that feel genuinely helpful rather than robotic, handling diverse accents, speaking styles, and conversation paths with confidence. We serve businesses across the UK, USA, and Pakistan, helping them automate high-volume voice interactions while maintaining exceptional customer experience standards. From initial strategy through deployment and ongoing optimisation, we partner with you to build voice solutions that genuinely transform your customer communications and deliver measurable business results.",
    cardsHeading: {
      before: "Comprehensive ",
      highlight: "Voicebot",
      after: " Solutions",
    },
    features: [
      {
        icon: PhoneCall,
        title: "Customer Service Voicebots",
        description:
          "AI-powered voicebots that handle inbound customer service calls, answer questions, resolve issues, and route callers — reducing hold times and operating costs.",
      },
      {
        icon: RefreshCw,
        title: "IVR Modernisation",
        description:
          "Transform outdated IVR systems into intelligent, conversational voice experiences that understand natural speech and dramatically improve customer satisfaction.",
      },
      {
        icon: PhoneOutgoing,
        title: "Outbound Voicebots",
        description:
          "Automated outbound calling systems for appointment reminders, payment notifications, survey collection, and proactive customer communication.",
      },
      {
        icon: Smartphone,
        title: "Voice-Enabled Applications",
        description:
          "We integrate voice capabilities into mobile apps, smart speakers, and web applications, enabling hands-free, intuitive user interactions.",
      },
      {
        icon: Languages,
        title: "Multilingual Voicebots",
        description:
          "Voicebots capable of understanding and responding in multiple languages, enabling businesses to serve diverse, global customer bases.",
      },
    ],
  },
  {
    slug: "chatbots",
    number: "09",
    title: ["Chatbots"],
    heroDescription:
      "The Social Nexus builds intelligent, conversational chatbots that engage customers, automate support, and drive business growth 24/7. From simple FAQ bots to advanced AI-powered conversational agents, we design and deploy chatbot solutions that deliver exceptional user experiences and measurable business results.",
    image: "/services/9.jpg",
    overviewFocus: "chatbot development",
    overviewTeam: "conversational AI engineers and product designers",
    overviewHeading: {
      before: "Building Intelligent ",
      highlight: "Conversations",
      after: " Backed by Deep AI Expertise",
    },
    overviewParagraph:
      "The Social Nexus combines over 20 years of technology experience with cutting-edge expertise in conversational AI to build chatbots that genuinely understand and help your customers. Our team of AI developers, conversation designers, and UX specialists collaborates to create chatbot experiences that feel natural, efficient, and on-brand. We serve businesses across the UK, USA, and Pakistan, from startups deploying their first chatbot to enterprises building sophisticated multi-channel conversational AI ecosystems. Every chatbot we build is designed to learn and improve over time, handling an ever-growing range of queries with increasing accuracy and confidence, delivering lasting value to your business.",
    cardsHeading: {
      before: "Comprehensive ",
      highlight: "Chatbot",
      after: " Solutions",
    },
    features: [
      {
        icon: MessageCircle,
        title: "Customer Service Chatbots",
        description:
          "AI-powered customer service chatbots that handle enquiries, resolve issues, and escalate complex cases — delivering 24/7 support at a fraction of the cost.",
      },
      {
        icon: UserCheck,
        title: "Sales & Lead Generation Bots",
        description:
          "Intelligent sales chatbots that qualify leads, book appointments, recommend products, and guide customers through the buying journey.",
      },
      {
        icon: Globe,
        title: "Website Chatbots",
        description:
          "Shop helpers that recommend products, track orders and support cart recovery.",
      },
      {
        icon: Share2,
        title: "WhatsApp & Messenger Bots",
        description:
          "Conversational bots deployed on WhatsApp, Facebook Messenger, and other messaging platforms to reach customers where they already are.",
      },
      {
        icon: ShoppingCart,
        title: "E-commerce Chatbots",
        description:
          "Smart e-commerce bots for product recommendations, order tracking, returns assistance, and personalised shopping experiences.",
      },
      {
        icon: Users,
        title: "HR & Internal Chatbots",
        description:
          "Internal chatbots for employee onboarding, HR queries, IT helpdesk support, and knowledge base access — boosting productivity and employee satisfaction.",
      },
      {
        icon: Bot,
        title: "Custom AI Conversational Agents",
        description:
          "Advanced conversational AI agents powered by the latest large language models, capable of complex, context-aware conversations tailored to your business domain.",
      },
    ],
  },
  {
    slug: "erp-crm-implementation",
    number: "10",
    title: ["ERP & CRM", "Implementation"],
    heroDescription:
      "The Social Nexus delivers expert ERP and CRM implementation services that transform how your business manages operations, customer relationships, and data. We help organisations select, configure, and implement the right enterprise systems to streamline processes, improve visibility, and drive sustainable growth across all departments.",
    image: "/services/10.jpg",
    overviewFocus: "ERP and CRM implementation",
    overviewTeam: "solution consultants and systems engineers",
    overviewHeading: {
      before: "Transforming Business Operations Through ",
      highlight: "Expert System Implementation",
    },
    overviewParagraph:
      "The Social Nexus brings over 20 years of technology and business process expertise to every ERP and CRM implementation project. Our certified implementation specialists combine deep technical knowledge with a thorough understanding of business operations to deliver systems that genuinely work for your organisation. We understand that ERP and CRM implementations are complex, high-stakes projects that touch every part of your business. That's why we invest heavily in upfront discovery, thorough requirements analysis, and meticulous project management to ensure implementations are delivered on time, within budget, and to specification. We serve clients across the UK, USA, and Pakistan, from SMEs implementing their first CRM to enterprises undertaking major ERP transformations.",
    cardsHeading: {
      before: "Comprehensive ",
      highlight: "ERP & CRM Solutions",
    },
    features: [
      {
        icon: Settings2,
        title: "ERP Implementation",
        description:
          "End-to-end ERP implementation services across leading platforms including SAP, Microsoft Dynamics, Odoo, and more — tailored to your industry and business requirements.",
      },
      {
        icon: Contact,
        title: "CRM Implementation",
        description:
          "Expert CRM implementation and configuration for Salesforce, HubSpot, Zoho, and custom CRM platforms that optimise your sales, marketing, and customer service processes.",
      },
      {
        icon: Plug,
        title: "System Integration",
        description:
          "Seamless integration of your ERP and CRM systems with existing business applications, ensuring smooth data flows and eliminating silos across your organisation.",
      },
      {
        icon: Database,
        title: "Data Migration",
        description:
          "Secure, accurate migration of your existing business data into new ERP and CRM platforms, with thorough validation and cleansing to ensure data integrity.",
      },
      {
        icon: Puzzle,
        title: "Custom ERP/CRM Development",
        description:
          "Bespoke ERP and CRM solutions built from the ground up for businesses with unique processes that off-the-shelf systems cannot accommodate.",
      },
      {
        icon: GraduationCap,
        title: "Training & Change Management",
        description:
          "Comprehensive user training, change management support, and adoption programmes that ensure your team embraces and maximises your new systems.",
      },
      {
        icon: Wrench,
        title: "Ongoing Support & Optimisation",
        description:
          "Post-implementation support, system maintenance, and continuous optimisation services to ensure your ERP and CRM systems keep pace with your evolving business needs.",
      },
    ],
  },
  {
    slug: "brand-identity-logo-design",
    number: "11",
    title: ["Brand Identity &", "Logo Design"],
    heroDescription:
      "We craft brand identities that communicate purpose, personality, and positioning. At The Social Nexus, branding is not just design — it's storytelling that builds trust and recognition.",
    image: "/services/11.jpg",
    overviewFocus: "brand identity and logo design",
    overviewTeam: "brand strategists and designers",
    overviewParagraph:
      "We craft brand identities that communicate purpose, personality, and positioning. At The Social Nexus, branding is not just design — it's storytelling that builds trust and recognition.",
    cardsHeading: {
      before: "What We Create",
    },
    features: [
      {
        icon: PenTool,
        title: "Logo Design",
        description:
          "Timeless, scalable logos that represent your brand essence.",
      },
      {
        icon: BookOpen,
        title: "Brand Guidelines",
        description: "Typography, color systems, usage rules, and tone.",
      },
      {
        icon: Palette,
        title: "Visual Identity Systems",
        description: "Consistency across digital and print platforms.",
      },
    ],
  },
  {
    slug: "saas-development",
    number: "12",
    title: ["SaaS", "Development"],
    heroDescription:
      "We are a leading SaaS development agency delivering custom SaaS products, multi-tenant platforms, and subscription-based software solutions. We help businesses launch and scale cloud-based products that are secure, reliable, and built for recurring growth. Partner with The Social Nexus to bring your SaaS idea to market faster.",
    image: "/services/12.jpg",
    overviewFocus: "SaaS development",
    overviewTeam: "product engineers and cloud architects",
    overviewHeading: {
      before: "Building Scalable ",
      highlight: "SaaS Products",
      after: " Backed by Industry Experience",
    },
    overviewParagraph:
      "The Social Nexus stands as a trusted SaaS development agency with over 8 years of collective experience in delivering custom SaaS solutions tailored to business goals. Our team of expert developers, designers, and strategists builds secure, scalable, and high-performance SaaS products using modern tools, agile methodologies, and best practices. We focus on SaaS platforms that are intuitive, reliable, and optimized for recurring growth. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to build SaaS products that are secure, scalable, and ready for the market.",
    features: [
      {
        icon: Rocket,
        title: "SaaS Product Development",
        description:
          "SaaS product development focuses on building cloud-native applications from concept to launch, designed for scalability, recurring usage, and long-term customer retention.",
      },
      {
        icon: Layers,
        title: "Multi-Tenant Architecture",
        description:
          "Multi-tenant architecture enables a single SaaS platform to securely serve multiple customers, isolating their data while keeping infrastructure costs efficient.",
      },
      {
        icon: Lightbulb,
        title: "SaaS MVP Development",
        description:
          "SaaS MVP development helps you validate your idea quickly by launching a lean, functional product that can attract early users and investor interest.",
      },
      {
        icon: CreditCard,
        title: "Subscription & Billing Integration",
        description:
          "Subscription and billing integration sets up automated recurring payments, plan management, and invoicing using trusted billing platforms.",
      },
      {
        icon: BarChart3,
        title: "SaaS Dashboard & Analytics",
        description:
          "SaaS dashboard and analytics development give your customers and internal teams real-time visibility into usage, performance, and key business metrics.",
      },
      {
        icon: ShieldCheck,
        title: "SaaS Security & Compliance",
        description:
          "SaaS security and compliance ensure your platform meets data protection standards, safeguarding customer information and building long-term trust.",
      },
      {
        icon: Gauge,
        title: "SaaS Scalability & Performance Optimisation",
        description:
          "SaaS scalability and performance optimisation prepare your platform to handle growing user loads without sacrificing speed or stability.",
      },
      {
        icon: Cloud,
        title: "SaaS Migration Services",
        description:
          "SaaS migration services help you move existing applications or data into a modern, cloud-based SaaS model with minimal downtime.",
      },
    ],
  },
  {
    slug: "maintenance-and-support",
    number: "13",
    title: ["Maintenance", "and Support"],
    heroDescription:
      "We are a leading software maintenance and support agency delivering ongoing care for websites, applications, and enterprise systems. We help businesses keep their digital products secure, fast, and fully operational, minimising downtime and protecting long-term performance. Partner with The Social Nexus to keep your software running at its best.",
    image: "/services/13.jpg",
    overviewFocus: "software maintenance and support",
    overviewTeam: "support engineers and site reliability specialists",
    overviewHeading: {
      before: "Building Long-Term ",
      highlight: "Reliability Backed",
      after: " by Industry Experience",
    },
    overviewParagraph:
      "The Social Nexus stands as a trusted maintenance and support agency with over 8 years of collective experience in keeping software solutions secure, stable, and tailored to business goals. Our team of expert engineers, analysts, and support specialists ensures every system continues to perform reliably using modern tools, agile methodologies, and best practices. We focus on minimising downtime, resolving issues quickly, and protecting your investment in technology. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to keep your software secure, reliable, and ready to support future growth.",
    features: [
      {
        icon: Wrench,
        title: "Application Maintenance",
        description:
          "Application maintenance covers ongoing upkeep of your software, ensuring it continues to run smoothly as user needs, platforms, and technologies evolve.",
      },
      {
        icon: Puzzle,
        title: "Bug Fixing & Issue Resolution",
        description:
          "Bug fixing and issue resolution identify and resolve errors quickly, minimising disruption to your users and protecting the reputation of your product.",
      },
      {
        icon: Activity,
        title: "Performance Monitoring & Optimisation",
        description:
          "Performance monitoring and optimisation continuously track system health, identifying bottlenecks and improving speed, stability, and overall user experience.",
      },
      {
        icon: ShieldCheck,
        title: "Security Patching & Updates",
        description:
          "Security patching and updates keep your software protected against vulnerabilities by applying timely fixes, framework updates, and dependency upgrades.",
      },
      {
        icon: Rocket,
        title: "Feature Enhancements",
        description:
          "Feature enhancements add new functionality to your existing software, keeping it aligned with changing business requirements and user expectations.",
      },
      {
        icon: Headset,
        title: "Technical Support & Helpdesk",
        description:
          "Technical support and helpdesk services provide responsive assistance to your team and customers, resolving issues efficiently through dedicated support channels.",
      },
      {
        icon: Server,
        title: "Server & Infrastructure Management",
        description:
          "Server and infrastructure management ensures your hosting environment remains stable, secure, and properly configured for consistent uptime.",
      },
      {
        icon: RefreshCw,
        title: "Software Upgrades & Version Control",
        description:
          "Software upgrades and version control keep your systems current with the latest stable releases while maintaining a clear history of changes.",
      },
    ],
  },
  {
    slug: "salesforce-development-consulting",
    number: "14",
    title: ["Salesforce Development &", "Consulting"],
    heroDescription:
      "We are a leading Salesforce development and consulting agency delivering custom CRM implementations, integrations, and automation solutions. We help businesses streamline sales, marketing, and customer service operations using the full power of the Salesforce platform. Partner with The Social Nexus to get more value from your Salesforce investment.",
    image: "/services/14.jpg",
    overviewFocus: "Salesforce development and consulting",
    overviewTeam: "certified Salesforce consultants and developers",
    overviewHeading: {
      before: "Building Smarter ",
      highlight: "CRM Systems",
      after: " Backed by Industry Experience",
    },
    overviewParagraph:
      "The Social Nexus stands as a trusted Salesforce development and consulting agency with over 8 years of collective experience in delivering tailored CRM solutions aligned with business goals. Our team of expert Salesforce developers, administrators, and consultants builds secure, scalable, and high-performing CRM systems using modern tools, agile methodologies, and best practices. We focus on Salesforce solutions that improve efficiency, visibility, and customer relationships. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to build Salesforce systems that are secure, reliable, and ready to support future growth.",
    cardsHeading: {
      before: "Comprehensive ",
      highlight: "Salesforce",
      after: " Solutions",
    },
    features: [
      {
        icon: Settings2,
        title: "Salesforce Implementation",
        description:
          "Salesforce implementation sets up your CRM from the ground up, configuring it to match your sales processes, teams, and business objectives.",
      },
      {
        icon: SlidersHorizontal,
        title: "Salesforce Customisation",
        description:
          "Salesforce customisation tailors objects, fields, layouts, and workflows so the platform fits your unique business needs rather than generic defaults.",
      },
      {
        icon: Plug,
        title: "Salesforce Integration",
        description:
          "Salesforce integration connects your CRM with other business tools and data sources, ensuring information flows seamlessly across your organisation.",
      },
      {
        icon: Code,
        title: "Salesforce App Development (Lightning)",
        description:
          "Salesforce app development using the Lightning platform builds custom applications directly within your CRM ecosystem to extend its core capabilities.",
      },
      {
        icon: Database,
        title: "Salesforce Data Migration",
        description:
          "Salesforce data migration moves your existing customer and business data into Salesforce accurately and securely, with minimal disruption.",
      },
      {
        icon: Workflow,
        title: "Salesforce Automation (Flows & Apex)",
        description:
          "Salesforce automation using Flows and Apex reduces manual work by automating repetitive tasks, approvals, and business logic within your CRM.",
      },
      {
        icon: Lightbulb,
        title: "Salesforce CRM Consulting",
        description:
          "Salesforce CRM consulting provides strategic guidance on platform adoption, optimisation, and best practices to maximise your return on investment.",
      },
      {
        icon: Wrench,
        title: "Salesforce Support & Maintenance",
        description:
          "Salesforce support and maintenance keep your CRM running smoothly with ongoing fixes, updates, and performance improvements.",
      },
    ],
  },
  {
    slug: "cloud-migration-cloud-operations",
    number: "15",
    title: ["Cloud Migration &", "Cloud Operations"],
    heroDescription:
      "We are a leading cloud migration and cloud operations agency delivering secure, efficient transitions to the cloud along with ongoing infrastructure management. We help businesses modernise their systems, reduce operational costs, and improve scalability across leading cloud platforms. Partner with The Social Nexus to move to the cloud with confidence.",
    image: "/services/15.jpg",
    overviewFocus: "cloud migration and cloud operations",
    overviewTeam: "cloud architects and DevOps engineers",
    overviewHeading: {
      before: "Building Resilient ",
      highlight: "Cloud Infrastructure",
      after: " Backed by Industry Experience",
    },
    overviewParagraph:
      "The Social Nexus stands as a trusted cloud migration and operations agency with over 8 years of collective experience in delivering secure, scalable cloud solutions tailored to business goals. Our team of expert cloud engineers, architects, and DevOps specialists manages every stage of the migration and operations lifecycle using modern tools, agile methodologies, and best practices. We focus on cloud environments that are cost-efficient, secure, and built for future growth. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to build cloud infrastructure that is secure, reliable, and ready to scale.",
    cardsHeading: {
      before: "Comprehensive ",
      highlight: "Cloud Migration & Operations",
      after: " Solutions",
    },
    features: [
      {
        icon: ArrowUpRight,
        title: "Cloud Migration Strategy",
        description:
          "Cloud migration strategy assesses your current systems and designs a clear roadmap for moving applications and data to the cloud with minimal risk.",
      },
      {
        icon: Database,
        title: "Application & Data Migration",
        description:
          "Application and data migration moves your existing workloads and information to the cloud securely, preserving integrity and minimising downtime.",
      },
      {
        icon: Cloud,
        title: "Cloud Infrastructure Setup",
        description:
          "Cloud infrastructure setup configures scalable, secure environments on leading cloud platforms tailored to your performance and budget requirements.",
      },
      {
        icon: GitMerge,
        title: "Multi-Cloud & Hybrid Cloud Solutions",
        description:
          "Multi-cloud and hybrid cloud solutions combine multiple providers or on-premise systems with the cloud, giving you flexibility, redundancy, and control.",
      },
      {
        icon: PiggyBank,
        title: "Cloud Cost Optimisation",
        description:
          "Cloud cost optimisation reviews your infrastructure usage to eliminate waste and ensure you only pay for the resources your business actually needs.",
      },
      {
        icon: ShieldCheck,
        title: "Cloud Security & Compliance",
        description:
          "Cloud security and compliance implement access controls, encryption, and monitoring to protect your data and meet industry regulations.",
      },
      {
        icon: Workflow,
        title: "DevOps & Cloud Automation",
        description:
          "DevOps and cloud automation streamline deployment, scaling, and monitoring through automated pipelines and infrastructure-as-code practices.",
      },
      {
        icon: Activity,
        title: "Cloud Monitoring & Managed Operations",
        description:
          "Cloud monitoring and managed operations provide ongoing oversight of your cloud environment, ensuring consistent uptime, performance, and rapid issue resolution.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
