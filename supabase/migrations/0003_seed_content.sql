-- Seeds the schema (0001_init.sql + 0002_gallery_tables.sql) with the
-- content the public site currently renders from hardcoded arrays in
-- app/portfolio/page.tsx, lib/services-data.ts, and app/faqs/page.tsx.
-- Run this last, in the Supabase SQL Editor, after the two migrations above.
-- Safe to re-run: every insert is keyed off a unique slug/path and guarded
-- with "on conflict do nothing".

-- =========================================================
-- Portfolio items (Web Development grid — /portfolio + home strip)
-- =========================================================
insert into portfolio_items (slug, title, categories, stack, preview_href, image_path, sort_order, published) values
('mobiledoctor', 'Mobile Doctor', array['Phone Repair','E-commerce'], array['Elementor','WordPress'], 'https://mobiledoctoruk.com/', '/portfolio/mobiledoctor.jpg', 0, true),
('hotspotayr', 'Hotspot Ayr', array['Phone Repair'], array['Elementor','WordPress'], 'https://hotspotayr.com/', '/portfolio/hotspot.jpg', 1, true),
('phone-doctor', 'Phone Doctor', array['Phone Repair'], array['Elementor','WordPress'], 'https://phonedoctorayr.co.uk/', '/portfolio/Phone doctor.jpg', 2, true),
('matlock', 'Matlock Phones & Vapes', array['E-commerce','Phone Repair','Phone Accessories'], array['Elementor','WooCommerce','WordPress'], null, '/portfolio/matlock.jpg', 3, true),
('islamic-wall-arts', 'Islamic Wall Arts', array['Religious Donation','E-commerce'], array['Elementor','WordPress'], 'https://islamicwallarts.co.uk/', '/portfolio/islamic-wall-arts.jpg', 4, true),
('al-quran-islamic-education', 'Al Quran Islamic Education', array['Religious Donation'], array['Elementor','WordPress'], null, '/portfolio/alquran-islamic-education.jpg', 5, true),
('gadgetsrepairltd', 'Gadgets Repair Ltd', array['Phone Repair','E-commerce'], array['Elementor','WordPress'], null, '/portfolio/gadget-repaier.jpg', 6, true),
('cvs', 'CVS Recovery', array['Tyres','Business'], array['Elementor','WordPress'], null, '/portfolio/cvs.jpg', 7, true),
('labubu-offical', 'Labubu Offical', array['Portfolio','Business','E-commerce'], array['Elementor','WordPress'], null, '/portfolio/labubu-offical.jpg', 8, true),
('oww', 'Outside Walla Walla', array['Membership','E-commerce'], array['Elementor','Membership','WooCommerce'], null, '/portfolio/oww.jpg', 9, true),
('wimmera-security', 'Wimmera Security', array['Security'], array['Elementor','WordPress'], null, '/portfolio/wimmera-security.jpg', 10, true),
('ipmsystems', 'IPM Systems', array['IT Solution','Business'], array['Elementor','WordPress'], null, '/portfolio/IPMS systems.jpg', 11, true),
('zaza-doner', 'Zaza Doner', array['Restaurants','E-commerce'], array['Elementor','WooCommerce','WordPress'], null, '/portfolio/zaza-donner.jpg', 12, true),
('total-tech-repair', 'Total Tech Repair', array['Phone Accessories','E-commerce'], array['Elementor','WooCommerce','WordPress'], null, '/portfolio/total-tech-repair.jpg', 13, true),
('fix-to-go', 'Fix To Go', array['E-commerce','Phone Accessories'], array['Elementor','WooCommerce','WordPress'], null, '/portfolio/fixtogo.jpg', 14, true),
('heywood', 'Heywood Mobiles & Vapes', array['Phone Repair','Phone Accessories'], array['Elementor','WordPress'], null, '/portfolio/heywood.jpg', 15, true),
('techfixman', 'Techfixman', array['Phone Repair'], array['Elementor','WordPress'], null, '/portfolio/techfixman.jpg', 16, true),
('pci-computers', 'PCI Computers', array['IT Solution'], array['Elementor','WordPress'], 'https://pcicomputers.co.uk/', '/portfolio/pci-computers.jpg', 17, true),
('worix-it', 'Worix IT', array['Business','IT Solution'], array['Elementor','WordPress'], null, '/portfolio/worix-IT.jpg', 18, true),
('icmobiletyre', 'IC Mobile Tyre Fitting', array['Tyres','Business'], array['Elementor','WordPress'], null, '/portfolio/ic-mobile-tyres.jpg', 19, true),
('pcxpress', 'PC Xpress', array['Phone Repair','Phone Accessories'], array['Elementor','WooCommerce','WordPress'], null, '/portfolio/pcxpress.jpg', 20, true),
('ifix', 'iFix', array['Phone Repair','Phone Accessories'], array['Elementor','WordPress'], 'https://ifixgadgetsltd.com/', '/portfolio/ifix-old.jpg', 21, true),
('mobitech-repair', 'Mobitech Repair', array['E-commerce','Phone Repair','Phone Accessories'], array['Elementor','WooCommerce','WordPress'], null, '/portfolio/mobitech-repair.jpg', 22, true),
('zummunta', 'Zummunta', array['Religious Donation'], array['Donation','Elementor','WordPress'], null, '/portfolio/Zummunta.jpg', 23, true),
('mobi-fix', 'Mobi Fix', array['E-commerce','Phone Repair'], array['Elementor','WooCommerce','WordPress'], 'https://mobifix.uk/', '/portfolio/mobifix.jpg', 24, true),
('four-minds-security', 'Four Minds Security', array['Security'], array['Elementor','WordPress'], null, '/portfolio/four mind secuirty.jpg', 25, true),
('wendy-bailye', 'Wendy Bailye', array['Business','E-commerce','Portfolio'], array['Elementor','WooCommerce','WordPress'], null, '/portfolio/wendy.jpg', 26, true),
('skora-care', 'Skora Care', array['E-commerce'], array['Elementor','WooCommerce','WordPress'], null, '/portfolio/skora-care.jpg', 27, true),
('risetech', 'Riseteck Ltd', array['E-commerce','Phone Accessories'], array['Elementor','WooCommerce','WordPress'], null, '/portfolio/risetech.jpg', 28, true),
('almustafa-online-academy', 'Al Mustafa Online Academy', array['Religious Donation','Membership'], array['Elementor','WordPress'], 'https://almustafaonlineacademy.com/', '/portfolio/almustafaonlineacademy.jpg', 29, true),
('mw-institute', 'MW Institute', array['Business'], array['Elementor','WordPress'], 'https://mwinstitute.org.uk/', '/portfolio/mwinstitute.jpg', 30, true),
('phone-repair-melksham', 'Phone Repair Melksham', array['Phone Repair'], array['Elementor','WordPress'], 'https://phonerepairmelksham.co.uk/', '/portfolio/phonerepairmelksham.jpg', 31, true),
('ruqyah', 'Ruqyah', array['Religious Donation'], array['Elementor','WordPress'], 'https://ruqyah.org/', '/portfolio/ruqyah.jpg', 32, true)
on conflict (slug) do nothing;

-- =========================================================
-- Logo design gallery
-- =========================================================
insert into logo_images (image_path, sort_order, published)
select v.path, v.ord, true
from (values
  ('/logo-designs/1.webp', 0), ('/logo-designs/2.webp', 1), ('/logo-designs/3.webp', 2),
  ('/logo-designs/4.webp', 3), ('/logo-designs/5.webp', 4), ('/logo-designs/6.webp', 5),
  ('/logo-designs/7.webp', 6), ('/logo-designs/8.webp', 7), ('/logo-designs/9.webp', 8),
  ('/logo-designs/10.webp', 9), ('/logo-designs/11.webp', 10), ('/logo-designs/12.webp', 11),
  ('/logo-designs/13.webp', 12), ('/logo-designs/14.webp', 13)
) as v(path, ord)
where not exists (select 1 from logo_images li where li.image_path = v.path);

-- =========================================================
-- Social media design gallery
-- =========================================================
insert into social_media_images (image_path, sort_order, published)
select v.path, v.ord, true
from (values
  ('/posts/1.webp', 0), ('/posts/2.webp', 1), ('/posts/3.webp', 2), ('/posts/4.webp', 3),
  ('/posts/5.webp', 4), ('/posts/6.webp', 5), ('/posts/7.webp', 6), ('/posts/8.webp', 7),
  ('/posts/9.webp', 8), ('/posts/10.webp', 9), ('/posts/11.webp', 10), ('/posts/12.webp', 11),
  ('/posts/13.webp', 12), ('/posts/14.webp', 13), ('/posts/15.webp', 14), ('/posts/16.webp', 15),
  ('/posts/17.webp', 16), ('/posts/18.webp', 17), ('/posts/19.webp', 18), ('/posts/20.webp', 19),
  ('/posts/21.webp', 20), ('/posts/22.webp', 21), ('/posts/23.webp', 22), ('/posts/24.webp', 23),
  ('/posts/25.webp', 24), ('/posts/26.webp', 25), ('/posts/27.webp', 26), ('/posts/28.webp', 27),
  ('/posts/29.webp', 28), ('/posts/30.webp', 29), ('/posts/31.webp', 30)
) as v(path, ord)
where not exists (select 1 from social_media_images smi where smi.image_path = v.path);

-- =========================================================
-- FAQs
-- =========================================================
insert into faqs (question, answer, sort_order, published) values
('What services does The Social Nexus specialize in?', 'The Social Nexus specializes in AI solutions, web and mobile development, automation, branding, digital marketing, ERP/CRM systems, chatbots, and modern business growth strategies tailored for startups and enterprises.', 0, true),
('How does The Social Nexus help businesses grow digitally?', 'We combine creative design, advanced technology, and data-driven marketing strategies to help businesses increase visibility, improve customer engagement, and scale efficiently.', 1, true),
('What industries does The Social Nexus work with?', 'We work with startups, eCommerce brands, healthcare, real estate, finance, education, SaaS businesses, and enterprises looking for innovative digital solutions.', 2, true),
('What technologies does The Social Nexus use?', 'Our team works with modern technologies including React, Next.js, Node.js, MongoDB, Firebase, Shopify, WordPress, AI tools, and cloud-based platforms.', 3, true),
('Can The Social Nexus handle both small and large-scale projects?', 'Absolutely. Whether you need a startup website, enterprise software, AI automation, or a complete digital transformation, our team can scale solutions according to your requirements.', 4, true),
('Do you offer AI automation and chatbot solutions?', 'Yes, we develop AI-powered chatbots, voicebots, and automation systems that streamline workflows, improve customer support, and increase efficiency.', 5, true),
('How long does a typical project take to complete?', 'Project timelines depend on complexity and scope. Smaller projects may take a few weeks, while larger custom platforms and enterprise solutions can take several months.', 6, true),
('Do you provide post-launch support and maintenance?', 'Yes, we offer ongoing support, maintenance, updates, performance optimization, and technical assistance after project deployment.', 7, true),
('Can you redesign or upgrade an existing website or application?', 'Definitely. We can modernize outdated websites, improve performance, redesign user interfaces, and add new features to existing platforms.', 8, true),
('How does The Social Nexus ensure quality and security?', 'We follow industry best practices for development, testing, scalability, and data security to ensure every solution is reliable, secure, and high-performing.', 9, true),
('Do you offer digital marketing and SEO services?', 'Yes, we provide SEO, social media marketing, branding, paid advertising, and growth strategies to help businesses increase online reach and conversions.', 10, true),
('What makes The Social Nexus different from other agencies?', 'We blend creativity, AI innovation, and scalable technology solutions to deliver impactful digital experiences focused on measurable business growth.', 11, true),
('How can I get started with The Social Nexus?', 'Simply contact us through our website or schedule a consultation with our team to discuss your project goals and business requirements.', 12, true)
on conflict do nothing;

-- =========================================================
-- Services
-- =========================================================
insert into services (slug, number, title, hero_description, image_path, overview_focus, overview_team, overview_heading, overview_paragraph, cards_heading, sort_order, published) values
('software-development', '01', array['Software','Development'],
 'We are a leading software development agency delivering custom, enterprise-grade, and scalable software solutions. We help businesses build secure, high-performance applications that streamline operations, reduce manual workload, and drive measurable growth in the digital era. Partner with The Social Nexus to turn your idea into reliable, production-ready software.',
 '/services/1.jpg', 'software development', 'engineers, architects, and QA specialists',
 '{"before": "Building Reliable ", "highlight": "Software Backed", "after": " by Industry Experience"}'::jsonb,
 'The Social Nexus stands as a trusted software development agency with over 20+ years of collective experience in delivering custom software solutions tailored to business goals. Our team of expert developers, architects, and strategists builds secure, scalable, and high-performance software using modern tools, agile methodologies, and best practices. We focus on software that is reliable, efficient, and built to support long-term growth. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to build software that is secure, maintainable, and ready to scale.',
 null, 1, true),
('web-development', '02', array['Web','Development'],
 'We provide end-to-end custom web development solutions designed to help businesses grow online. From responsive website design to robust back-end development, our team ensures your website is fast, secure, and user-friendly. Whether you need a startup site, an enterprise platform, or an eCommerce solution, we simplify the process and deliver websites that engage users and drive results.',
 '/services/2.jpg', 'web development', 'developers, designers, and strategists',
 '{"before": "Building Digital Experiences ", "highlight": "Backed by 10+ Years", "after": " of Expertise"}'::jsonb,
 'The Social Nexus brings over 20 years of collective experience in web development and design, creating digital experiences that define the future. Every pixel we place, every line of code we write, is a step towards perfection. We don''t just build websites — we architect digital universes. Our team of expert developers and designers serves clients across the UK, USA, and Pakistan, combining deep technical expertise with creative excellence to deliver websites that are fast, secure, accessible, and conversion-optimised. We use agile development methodologies, the latest technologies, and proven best practices to ensure every project exceeds client expectations and delivers measurable business results.',
 null, 2, true),
('mobile-app-development', '03', array['Mobile App','Development'],
 'We are a leading mobile app development agency delivering custom mobile app development, hybrid app development, and cross-platform solutions. We help businesses build engaging, scalable, and high-performance apps that enhance user experience, streamline operations, and drive growth in the digital era. Partner with The Social Nexus to bring your app idea to life.',
 '/services/3.jpg', 'mobile app development', 'developers, designers, and strategists',
 '{"before": "Building High-Performance ", "highlight": "Mobile Apps Backed", "after": " by Industry Experience"}'::jsonb,
 'The Social Nexus stands as a trusted mobile app development agency with over 8 years of collective experience in delivering custom mobile solutions tailored to business goals. Our team of expert developers, designers, and strategists crafts user-friendly, scalable, and high-performance apps across Android, iOS, and cross-platform technologies. Using modern tools, agile methodologies, and best practices, we ensure every app not only meets client expectations but also drives engagement, efficiency, and ROI. We focus on building apps that are intuitive, fast, and optimised for real-world usage. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to build mobile applications that are secure, reliable, and ready to support future growth.',
 '{"before": "Comprehensive ", "highlight": "Mobile App", "after": " Solutions"}'::jsonb, 3, true),
('generative-ai-development', '04', array['Generative AI','Development'],
 'We are a leading generative AI development agency delivering custom AI models, intelligent chatbots, and automation solutions powered by large language models. We help businesses unlock new efficiencies, enhance customer experiences, and innovate faster using cutting-edge AI technology. Partner with The Social Nexus to bring generative AI into your business.',
 '/services/4.jpg', 'generative AI development', 'AI engineers, data scientists, and product strategists',
 '{"before": "Building ", "highlight": "Intelligent Solutions", "after": " Backed by Industry Experience"}'::jsonb,
 'The Social Nexus stands as a trusted generative AI development agency with over 8 years of collective technology experience in delivering custom AI solutions tailored to business goals. Our team of expert AI engineers, data specialists, and strategists builds secure, scalable, and high-performing AI systems using modern tools, agile methodologies, and best practices. We focus on generative AI solutions that are practical, accurate, and optimised for real-world business impact. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to build AI systems that are secure, reliable, and ready to support future growth.',
 '{"before": "Comprehensive AI Development Solutions"}'::jsonb, 4, true),
('digital-marketing', '05', array['Digital','Marketing'],
 'The Social Nexus delivers powerful digital marketing and SEO services that increase your visibility, drive qualified traffic, and accelerate business growth. With over 20 years of experience in local and national SEO, we provide cost-effective strategies that take your business to the top of search results and maximise your return on marketing investment.',
 '/services/5.jpg', 'digital marketing and SEO', 'strategists, analysts, and content specialists',
 '{"before": "Growing Businesses Through Digital Marketing for Over 20 Years"}'::jsonb,
 'The Social Nexus has been helping businesses grow their digital presence and increase revenue through marketing for over two decades. We know your time is precious, which is why we focus on fast-turnaround, cost-effective strategies that deliver measurable results. Our team of SEO specialists, PPC managers, content strategists, and analytics experts works as an extension of your marketing team, bringing specialist expertise and cutting-edge tools to every campaign. We serve clients across the UK, USA, and Pakistan, from local businesses looking to dominate their area to global brands seeking to scale their digital presence. Our data-driven approach ensures every pound of your marketing budget is working as hard as possible.',
 null, 5, true),
('social-media-design', '06', array['Social Media','Design'],
 'The Social Nexus creates stunning social media visuals, branded templates, and creative assets that elevate your online presence and drive engagement across all platforms. Our creative team designs scroll-stopping content that captures attention, communicates your brand message, and builds a loyal, engaged following for your business.',
 '/services/6.jpg', 'social media design', 'designers, animators, and content strategists',
 '{"before": "Creating Social Media Visuals That Elevate Brands and Drive Engagement"}'::jsonb,
 'The Social Nexus has been creating compelling social media designs for businesses across the UK, USA, and Pakistan for over 20 years. Our creative team understands both the aesthetic demands and the algorithmic realities of social media — designing content that is not only beautiful but built to perform. We believe that strong social media design is inseparable from strong brand identity. Every post, story, and campaign asset we create is a reflection of your brand, and we work meticulously to ensure consistency, quality, and impact across every piece of content. Whether you need a complete social media visual identity from scratch or ongoing creative support, we bring the creativity, speed, and brand understanding to deliver.',
 null, 6, true),
('automation', '07', array['Automation'],
 'The Social Nexus delivers intelligent business automation solutions that eliminate repetitive tasks, reduce errors, and dramatically increase operational efficiency. We design and implement automated workflows, system integrations, and process automation systems that free your team to focus on what matters most — growing your business.',
 '/services/7.jpg', 'business automation', 'automation engineers and business analysts',
 '{"before": "Transforming Operations Through ", "highlight": "Intelligent Automation"}'::jsonb,
 'The Social Nexus has been helping businesses automate their operations for over 20 years, delivering measurable improvements in efficiency, accuracy, and scalability. Our automation specialists work closely with your team to map existing processes, identify automation opportunities, and design solutions that deliver rapid return on investment. We serve businesses across the UK, USA, and Pakistan, from SMEs looking to streamline manual tasks to enterprises seeking to automate complex, multi-system workflows. Our approach combines deep technical expertise with a thorough understanding of business operations, ensuring every automation solution we deliver genuinely transforms the way your organisation works and creates sustainable competitive advantage.',
 null, 7, true),
('voicebots', '08', array['Voicebots'],
 'The Social Nexus builds sophisticated voicebot and conversational AI systems that handle phone calls, voice queries, and spoken interactions intelligently and naturally. From automated customer service phone lines to voice-enabled applications, we design voicebot solutions that deliver exceptional spoken experiences and drive operational efficiency.',
 '/services/8.jpg', 'voicebot development', 'conversational AI engineers and voice designers',
 '{"before": "Building Natural ", "highlight": "Voice Experiences", "after": " Backed by Deep AI Expertise"}'::jsonb,
 'The Social Nexus combines advanced expertise in speech recognition, natural language understanding, and text-to-speech synthesis to build voicebots that sound natural and perform reliably. Our voice AI specialists design conversation flows that feel genuinely helpful rather than robotic, handling diverse accents, speaking styles, and conversation paths with confidence. We serve businesses across the UK, USA, and Pakistan, helping them automate high-volume voice interactions while maintaining exceptional customer experience standards. From initial strategy through deployment and ongoing optimisation, we partner with you to build voice solutions that genuinely transform your customer communications and deliver measurable business results.',
 '{"before": "Comprehensive ", "highlight": "Voicebot", "after": " Solutions"}'::jsonb, 8, true),
('chatbots', '09', array['Chatbots'],
 'The Social Nexus builds intelligent, conversational chatbots that engage customers, automate support, and drive business growth 24/7. From simple FAQ bots to advanced AI-powered conversational agents, we design and deploy chatbot solutions that deliver exceptional user experiences and measurable business results.',
 '/services/9.jpg', 'chatbot development', 'conversational AI engineers and product designers',
 '{"before": "Building Intelligent ", "highlight": "Conversations", "after": " Backed by Deep AI Expertise"}'::jsonb,
 'The Social Nexus combines over 20 years of technology experience with cutting-edge expertise in conversational AI to build chatbots that genuinely understand and help your customers. Our team of AI developers, conversation designers, and UX specialists collaborates to create chatbot experiences that feel natural, efficient, and on-brand. We serve businesses across the UK, USA, and Pakistan, from startups deploying their first chatbot to enterprises building sophisticated multi-channel conversational AI ecosystems. Every chatbot we build is designed to learn and improve over time, handling an ever-growing range of queries with increasing accuracy and confidence, delivering lasting value to your business.',
 '{"before": "Comprehensive ", "highlight": "Chatbot", "after": " Solutions"}'::jsonb, 9, true),
('erp-crm-implementation', '10', array['ERP & CRM','Implementation'],
 'The Social Nexus delivers expert ERP and CRM implementation services that transform how your business manages operations, customer relationships, and data. We help organisations select, configure, and implement the right enterprise systems to streamline processes, improve visibility, and drive sustainable growth across all departments.',
 '/services/10.jpg', 'ERP and CRM implementation', 'solution consultants and systems engineers',
 '{"before": "Transforming Business Operations Through ", "highlight": "Expert System Implementation"}'::jsonb,
 'The Social Nexus brings over 20 years of technology and business process expertise to every ERP and CRM implementation project. Our certified implementation specialists combine deep technical knowledge with a thorough understanding of business operations to deliver systems that genuinely work for your organisation. We understand that ERP and CRM implementations are complex, high-stakes projects that touch every part of your business. That''s why we invest heavily in upfront discovery, thorough requirements analysis, and meticulous project management to ensure implementations are delivered on time, within budget, and to specification. We serve clients across the UK, USA, and Pakistan, from SMEs implementing their first CRM to enterprises undertaking major ERP transformations.',
 '{"before": "Comprehensive ", "highlight": "ERP & CRM Solutions"}'::jsonb, 10, true),
('brand-identity-logo-design', '11', array['Brand Identity &','Logo Design'],
 'We craft brand identities that communicate purpose, personality, and positioning. At The Social Nexus, branding is not just design — it''s storytelling that builds trust and recognition.',
 '/services/11.jpg', 'brand identity and logo design', 'brand strategists and designers',
 null,
 'We craft brand identities that communicate purpose, personality, and positioning. At The Social Nexus, branding is not just design — it''s storytelling that builds trust and recognition.',
 '{"before": "What We Create"}'::jsonb, 11, true),
('saas-development', '12', array['SaaS','Development'],
 'We are a leading SaaS development agency delivering custom SaaS products, multi-tenant platforms, and subscription-based software solutions. We help businesses launch and scale cloud-based products that are secure, reliable, and built for recurring growth. Partner with The Social Nexus to bring your SaaS idea to market faster.',
 '/services/12.jpg', 'SaaS development', 'product engineers and cloud architects',
 '{"before": "Building Scalable ", "highlight": "SaaS Products", "after": " Backed by Industry Experience"}'::jsonb,
 'The Social Nexus stands as a trusted SaaS development agency with over 8 years of collective experience in delivering custom SaaS solutions tailored to business goals. Our team of expert developers, designers, and strategists builds secure, scalable, and high-performance SaaS products using modern tools, agile methodologies, and best practices. We focus on SaaS platforms that are intuitive, reliable, and optimized for recurring growth. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to build SaaS products that are secure, scalable, and ready for the market.',
 null, 12, true),
('maintenance-and-support', '13', array['Maintenance','and Support'],
 'We are a leading software maintenance and support agency delivering ongoing care for websites, applications, and enterprise systems. We help businesses keep their digital products secure, fast, and fully operational, minimising downtime and protecting long-term performance. Partner with The Social Nexus to keep your software running at its best.',
 '/services/13.jpg', 'software maintenance and support', 'support engineers and site reliability specialists',
 '{"before": "Building Long-Term ", "highlight": "Reliability Backed", "after": " by Industry Experience"}'::jsonb,
 'The Social Nexus stands as a trusted maintenance and support agency with over 8 years of collective experience in keeping software solutions secure, stable, and tailored to business goals. Our team of expert engineers, analysts, and support specialists ensures every system continues to perform reliably using modern tools, agile methodologies, and best practices. We focus on minimising downtime, resolving issues quickly, and protecting your investment in technology. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to keep your software secure, reliable, and ready to support future growth.',
 null, 13, true),
('salesforce-development-consulting', '14', array['Salesforce Development &','Consulting'],
 'We are a leading Salesforce development and consulting agency delivering custom CRM implementations, integrations, and automation solutions. We help businesses streamline sales, marketing, and customer service operations using the full power of the Salesforce platform. Partner with The Social Nexus to get more value from your Salesforce investment.',
 '/services/14.jpg', 'Salesforce development and consulting', 'certified Salesforce consultants and developers',
 '{"before": "Building Smarter ", "highlight": "CRM Systems", "after": " Backed by Industry Experience"}'::jsonb,
 'The Social Nexus stands as a trusted Salesforce development and consulting agency with over 8 years of collective experience in delivering tailored CRM solutions aligned with business goals. Our team of expert Salesforce developers, administrators, and consultants builds secure, scalable, and high-performing CRM systems using modern tools, agile methodologies, and best practices. We focus on Salesforce solutions that improve efficiency, visibility, and customer relationships. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to build Salesforce systems that are secure, reliable, and ready to support future growth.',
 '{"before": "Comprehensive ", "highlight": "Salesforce", "after": " Solutions"}'::jsonb, 14, true),
('cloud-migration-cloud-operations', '15', array['Cloud Migration &','Cloud Operations'],
 'We are a leading cloud migration and cloud operations agency delivering secure, efficient transitions to the cloud along with ongoing infrastructure management. We help businesses modernise their systems, reduce operational costs, and improve scalability across leading cloud platforms. Partner with The Social Nexus to move to the cloud with confidence.',
 '/services/15.jpg', 'cloud migration and cloud operations', 'cloud architects and DevOps engineers',
 '{"before": "Building Resilient ", "highlight": "Cloud Infrastructure", "after": " Backed by Industry Experience"}'::jsonb,
 'The Social Nexus stands as a trusted cloud migration and operations agency with over 8 years of collective experience in delivering secure, scalable cloud solutions tailored to business goals. Our team of expert cloud engineers, architects, and DevOps specialists manages every stage of the migration and operations lifecycle using modern tools, agile methodologies, and best practices. We focus on cloud environments that are cost-efficient, secure, and built for future growth. Serving global clients across the UK, USA, and Pakistan, we combine deep technical expertise, innovation, and industry insights to build cloud infrastructure that is secure, reliable, and ready to scale.',
 '{"before": "Comprehensive ", "highlight": "Cloud Migration & Operations", "after": " Solutions"}'::jsonb, 15, true)
on conflict (slug) do nothing;

-- =========================================================
-- Service features (one block per service, ordered by feature index)
-- =========================================================
insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'software-development'), f.icon, f.title, f.description, f.ord
from (values
  ('Code', 'Custom Software Development', 'Custom software development focuses on building bespoke applications engineered around your exact business processes, goals, and growth plans rather than off-the-shelf limitations.', 0),
  ('Building2', 'Enterprise Software Solutions', 'Enterprise software solutions deliver robust, large-scale systems that handle complex workflows, multiple departments, and high user volumes without compromising performance.', 1),
  ('Plug', 'API Development & Integration', 'API development and integration connect your software with third-party platforms, internal tools, and data sources, enabling smooth, automated communication across your entire tech stack.', 2),
  ('Lightbulb', 'Software Architecture & Consulting', 'Software architecture and consulting help you plan scalable, maintainable systems from the ground up, reducing technical debt and future development costs.', 3),
  ('RefreshCw', 'Legacy System Modernisation', 'Legacy system modernisation focuses on upgrading outdated applications with modern frameworks, improving speed, security, and compatibility with current technologies.', 4),
  ('Database', 'Database Design & Development', 'Database design and development ensure your data is structured, secure, and optimised for fast retrieval, supporting reporting, analytics, and day-to-day operations.', 5),
  ('Terminal', 'DevOps & CI/CD', 'DevOps and CI/CD services automate build, test, and deployment pipelines, helping your team ship updates faster with fewer errors and greater reliability.', 6),
  ('ShieldCheck', 'Quality Assurance & Testing', 'Quality assurance and testing covers functional, performance, and security testing to ensure every release is stable, bug-free, and ready for real-world use.', 7)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'software-development')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'software-development');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'web-development'), f.icon, f.title, f.description, f.ord
from (values
  ('LayoutTemplate', 'Front-End Web Development', 'Front-end development ensures your website is visually engaging and responsive.', 0),
  ('Server', 'Back-End Web Development', 'Our back-end development service manages your website''s server side functionality, ensuring secure, efficient data processing and seamless user interaction.', 1),
  ('Layers', 'Full-Stack Web Development', 'Full-stack web development covers both front-end and back-end solutions. We offer complete web solutions, creating functional, responsive, and secure websites.', 2),
  ('FileText', 'Content Management Systems (CMS)', 'CMS development enables easy management of your website content.', 3),
  ('AppWindow', 'Web Application Development', 'We build custom web applications designed for your business needs.', 4),
  ('Globe', 'WordPress Web Development', 'Our WordPress development service creates customizable and easy to manage websites.', 5),
  ('ShoppingCart', 'E-Commerce Web Development', 'E-Commerce development focuses on building online stores.', 6),
  ('Puzzle', 'Custom Widgets and Plugins Development', 'Custom widgets and plugins enhance your website''s functionality.', 7)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'web-development')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'web-development');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'mobile-app-development'), f.icon, f.title, f.description, f.ord
from (values
  ('Smartphone', 'Native Mobile Applications', 'Native app development focuses on creating applications designed specifically for iOS and Android, delivering the highest performance and best user experience on each platform.', 0),
  ('Bot', 'Android Development', 'Android development emphasises creating applications specifically for Android devices, leveraging Kotlin and Java to deliver feature-rich, optimised experiences.', 1),
  ('Puzzle', 'Custom App Development', 'Custom app development focuses on building bespoke applications tailored precisely to your business needs, workflows, and brand identity.', 2),
  ('AppWindow', 'iOS Development', 'iOS development specialises in creating applications designed specifically for the Apple ecosystem — iPhone, iPad, and beyond — with polished, fluid interfaces.', 3),
  ('Layers', 'Flutter App Development', 'Flutter app development leverages Google''s framework to create visually stunning, high-performance applications for both iOS and Android from a single codebase.', 4),
  ('Share2', 'Cross-Platform App Development', 'Cross-platform development is about designing apps that function beautifully on both iOS and Android, maximising reach while minimising cost.', 5),
  ('Code', 'React Native Development', 'React Native enables us to build near-native mobile experiences using JavaScript, with faster delivery and consistent performance across platforms.', 6),
  ('Server', 'Backend App Development', 'Backend app development specialises in creating robust server-side solutions that ensure efficient data processing and a smooth user experience for your applications.', 7)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'mobile-app-development')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'mobile-app-development');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'generative-ai-development'), f.icon, f.title, f.description, f.ord
from (values
  ('Brain', 'Custom LLM Solutions', 'Custom LLM solutions build and fine-tune large language models tailored to your industry, data, and specific business use cases.', 0),
  ('Bot', 'AI Chatbots & Virtual Assistants', 'AI chatbots and virtual assistants automate customer support, lead qualification, and internal workflows through natural, human-like conversations.', 1),
  ('LineChart', 'Generative AI Integration', 'Generative AI integration embeds AI capabilities such as content generation, summarisation, and recommendations directly into your existing software.', 2),
  ('ImageIcon', 'AI Content & Image Generation', 'AI content and image generation produce text, visuals, and creative assets at scale, helping teams move faster on marketing and product needs.', 3),
  ('SlidersHorizontal', 'AI Model Fine-Tuning', 'AI model fine-tuning adapts pre-trained models to your specific data and goals, improving accuracy and relevance for your business context.', 4),
  ('Database', 'Retrieval-Augmented Generation (RAG) Systems', 'Retrieval-augmented generation systems connect AI models with your own knowledge base, ensuring responses are accurate, current, and grounded in your data.', 5),
  ('Workflow', 'AI Workflow Automation', 'AI workflow automation uses generative AI to streamline repetitive business processes, freeing up teams to focus on higher-value work.', 6),
  ('Lightbulb', 'Generative AI Consulting & Strategy', 'Generative AI consulting and strategy help you identify the right use cases, tools, and roadmap to adopt AI responsibly and effectively.', 7)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'generative-ai-development')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'generative-ai-development');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'digital-marketing'), f.icon, f.title, f.description, f.ord
from (values
  ('Search', 'Search Engine Optimisation (SEO)', 'We boost your organic search rankings through technical SEO, on-page optimisation, content strategy, and high-authority link building — driving sustainable, long-term traffic growth.', 0),
  ('MapPin', 'Local SEO', 'Specialist local SEO services that put your business at the top of local search results, attracting nearby customers and driving footfall to your physical locations.', 1),
  ('MousePointerClick', 'Pay-Per-Click (PPC) Advertising', 'High-ROI Google Ads and Bing Ads campaigns expertly managed to maximise clicks, conversions, and return on ad spend for your business.', 2),
  ('Share2', 'Social Media Marketing', 'Strategic social media marketing across Facebook, Instagram, LinkedIn, and TikTok that builds brand awareness, engages audiences, and drives conversions.', 3),
  ('PenTool', 'Content Marketing', 'Compelling, SEO-optimised content strategies including blog posts, articles, infographics, and video content that attract, engage, and convert your target audience.', 4),
  ('Mail', 'Email Marketing', 'Targeted email marketing campaigns that nurture leads, retain customers, and drive repeat purchases with measurable, data-driven results.', 5),
  ('BarChart3', 'Analytics & Reporting', 'Comprehensive digital marketing analytics and performance reporting that give you clear visibility of ROI and actionable insights for continuous improvement.', 6)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'digital-marketing')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'digital-marketing');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'social-media-design'), f.icon, f.title, f.description, f.ord
from (values
  ('ImageIcon', 'Social Media Post Design', 'Eye-catching, brand-consistent social media post designs for Instagram, Facebook, LinkedIn, Twitter/X, and TikTok that engage your audience and drive interaction.', 0),
  ('LayoutGrid', 'Social Media Template Systems', 'Custom-designed template systems that allow your team to create on-brand social media content quickly and consistently, without needing a designer every time.', 1),
  ('Video', 'Story & Reel Design', 'Dynamic, attention-grabbing Instagram and Facebook Stories and Reels templates designed for maximum impact in the vertical mobile format.', 2),
  ('LayoutTemplate', 'Cover & Banner Design', 'Professionally designed profile covers, channel art, and banner images for all social platforms that make a strong first impression.', 3),
  ('BarChart3', 'Infographic Design', 'Visually compelling infographics that transform complex information into shareable, engaging visual content that drives organic reach.', 4),
  ('Megaphone', 'Campaign Creative', 'Integrated social media campaign creative including hero images, animated posts, carousel designs, and ad creative for paid social campaigns.', 5),
  ('Lightbulb', 'Brand Content Strategy', 'Strategic social media content planning that aligns your visual content with your brand identity, business goals, and audience preferences.', 6)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'social-media-design')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'social-media-design');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'automation'), f.icon, f.title, f.description, f.ord
from (values
  ('Bot', 'Robotic Process Automation (RPA)', 'We deploy software robots that mimic human actions to automate repetitive, rule-based tasks across your applications and systems, dramatically reducing manual effort.', 0),
  ('Workflow', 'Workflow Automation', 'End-to-end workflow automation that connects your tools, systems, and teams — eliminating bottlenecks and ensuring tasks flow seamlessly from initiation to completion.', 1),
  ('Plug', 'API Integration & Automation', 'We integrate disparate systems and automate data flows between platforms, ensuring your business applications work together in perfect harmony.', 2),
  ('Mail', 'Marketing Automation', 'Intelligent marketing automation systems for lead nurturing, email campaigns, social media scheduling, and customer journey automation.', 3),
  ('FileText', 'Document & Data Automation', 'Automated document generation, data extraction, transformation, and reporting systems that save hours of manual data processing.', 4),
  ('ShoppingCart', 'E-commerce Automation', 'Order processing, inventory management, customer communication, and fulfilment automation that scales with your online business.', 5),
  ('Terminal', 'Custom Automation Solutions', 'Bespoke automation solutions designed around your unique business processes, built to integrate seamlessly with your existing technology stack.', 6)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'automation')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'automation');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'voicebots'), f.icon, f.title, f.description, f.ord
from (values
  ('PhoneCall', 'Customer Service Voicebots', 'AI-powered voicebots that handle inbound customer service calls, answer questions, resolve issues, and route callers — reducing hold times and operating costs.', 0),
  ('RefreshCw', 'IVR Modernisation', 'Transform outdated IVR systems into intelligent, conversational voice experiences that understand natural speech and dramatically improve customer satisfaction.', 1),
  ('PhoneOutgoing', 'Outbound Voicebots', 'Automated outbound calling systems for appointment reminders, payment notifications, survey collection, and proactive customer communication.', 2),
  ('Smartphone', 'Voice-Enabled Applications', 'We integrate voice capabilities into mobile apps, smart speakers, and web applications, enabling hands-free, intuitive user interactions.', 3),
  ('Languages', 'Multilingual Voicebots', 'Voicebots capable of understanding and responding in multiple languages, enabling businesses to serve diverse, global customer bases.', 4)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'voicebots')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'voicebots');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'chatbots'), f.icon, f.title, f.description, f.ord
from (values
  ('MessageCircle', 'Customer Service Chatbots', 'AI-powered customer service chatbots that handle enquiries, resolve issues, and escalate complex cases — delivering 24/7 support at a fraction of the cost.', 0),
  ('UserCheck', 'Sales & Lead Generation Bots', 'Intelligent sales chatbots that qualify leads, book appointments, recommend products, and guide customers through the buying journey.', 1),
  ('Globe', 'Website Chatbots', 'Shop helpers that recommend products, track orders and support cart recovery.', 2),
  ('Share2', 'WhatsApp & Messenger Bots', 'Conversational bots deployed on WhatsApp, Facebook Messenger, and other messaging platforms to reach customers where they already are.', 3),
  ('ShoppingCart', 'E-commerce Chatbots', 'Smart e-commerce bots for product recommendations, order tracking, returns assistance, and personalised shopping experiences.', 4),
  ('Users', 'HR & Internal Chatbots', 'Internal chatbots for employee onboarding, HR queries, IT helpdesk support, and knowledge base access — boosting productivity and employee satisfaction.', 5),
  ('Bot', 'Custom AI Conversational Agents', 'Advanced conversational AI agents powered by the latest large language models, capable of complex, context-aware conversations tailored to your business domain.', 6)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'chatbots')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'chatbots');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'erp-crm-implementation'), f.icon, f.title, f.description, f.ord
from (values
  ('Settings2', 'ERP Implementation', 'End-to-end ERP implementation services across leading platforms including SAP, Microsoft Dynamics, Odoo, and more — tailored to your industry and business requirements.', 0),
  ('Contact', 'CRM Implementation', 'Expert CRM implementation and configuration for Salesforce, HubSpot, Zoho, and custom CRM platforms that optimise your sales, marketing, and customer service processes.', 1),
  ('Plug', 'System Integration', 'Seamless integration of your ERP and CRM systems with existing business applications, ensuring smooth data flows and eliminating silos across your organisation.', 2),
  ('Database', 'Data Migration', 'Secure, accurate migration of your existing business data into new ERP and CRM platforms, with thorough validation and cleansing to ensure data integrity.', 3),
  ('Puzzle', 'Custom ERP/CRM Development', 'Bespoke ERP and CRM solutions built from the ground up for businesses with unique processes that off-the-shelf systems cannot accommodate.', 4),
  ('GraduationCap', 'Training & Change Management', 'Comprehensive user training, change management support, and adoption programmes that ensure your team embraces and maximises your new systems.', 5),
  ('Wrench', 'Ongoing Support & Optimisation', 'Post-implementation support, system maintenance, and continuous optimisation services to ensure your ERP and CRM systems keep pace with your evolving business needs.', 6)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'erp-crm-implementation')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'erp-crm-implementation');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'brand-identity-logo-design'), f.icon, f.title, f.description, f.ord
from (values
  ('PenTool', 'Logo Design', 'Timeless, scalable logos that represent your brand essence.', 0),
  ('BookOpen', 'Brand Guidelines', 'Typography, color systems, usage rules, and tone.', 1),
  ('Palette', 'Visual Identity Systems', 'Consistency across digital and print platforms.', 2)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'brand-identity-logo-design')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'brand-identity-logo-design');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'saas-development'), f.icon, f.title, f.description, f.ord
from (values
  ('Rocket', 'SaaS Product Development', 'SaaS product development focuses on building cloud-native applications from concept to launch, designed for scalability, recurring usage, and long-term customer retention.', 0),
  ('Layers', 'Multi-Tenant Architecture', 'Multi-tenant architecture enables a single SaaS platform to securely serve multiple customers, isolating their data while keeping infrastructure costs efficient.', 1),
  ('Lightbulb', 'SaaS MVP Development', 'SaaS MVP development helps you validate your idea quickly by launching a lean, functional product that can attract early users and investor interest.', 2),
  ('CreditCard', 'Subscription & Billing Integration', 'Subscription and billing integration sets up automated recurring payments, plan management, and invoicing using trusted billing platforms.', 3),
  ('BarChart3', 'SaaS Dashboard & Analytics', 'SaaS dashboard and analytics development give your customers and internal teams real-time visibility into usage, performance, and key business metrics.', 4),
  ('ShieldCheck', 'SaaS Security & Compliance', 'SaaS security and compliance ensure your platform meets data protection standards, safeguarding customer information and building long-term trust.', 5),
  ('Gauge', 'SaaS Scalability & Performance Optimisation', 'SaaS scalability and performance optimisation prepare your platform to handle growing user loads without sacrificing speed or stability.', 6),
  ('Cloud', 'SaaS Migration Services', 'SaaS migration services help you move existing applications or data into a modern, cloud-based SaaS model with minimal downtime.', 7)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'saas-development')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'saas-development');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'maintenance-and-support'), f.icon, f.title, f.description, f.ord
from (values
  ('Wrench', 'Application Maintenance', 'Application maintenance covers ongoing upkeep of your software, ensuring it continues to run smoothly as user needs, platforms, and technologies evolve.', 0),
  ('Puzzle', 'Bug Fixing & Issue Resolution', 'Bug fixing and issue resolution identify and resolve errors quickly, minimising disruption to your users and protecting the reputation of your product.', 1),
  ('Activity', 'Performance Monitoring & Optimisation', 'Performance monitoring and optimisation continuously track system health, identifying bottlenecks and improving speed, stability, and overall user experience.', 2),
  ('ShieldCheck', 'Security Patching & Updates', 'Security patching and updates keep your software protected against vulnerabilities by applying timely fixes, framework updates, and dependency upgrades.', 3),
  ('Rocket', 'Feature Enhancements', 'Feature enhancements add new functionality to your existing software, keeping it aligned with changing business requirements and user expectations.', 4),
  ('Headset', 'Technical Support & Helpdesk', 'Technical support and helpdesk services provide responsive assistance to your team and customers, resolving issues efficiently through dedicated support channels.', 5),
  ('Server', 'Server & Infrastructure Management', 'Server and infrastructure management ensures your hosting environment remains stable, secure, and properly configured for consistent uptime.', 6),
  ('RefreshCw', 'Software Upgrades & Version Control', 'Software upgrades and version control keep your systems current with the latest stable releases while maintaining a clear history of changes.', 7)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'maintenance-and-support')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'maintenance-and-support');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'salesforce-development-consulting'), f.icon, f.title, f.description, f.ord
from (values
  ('Settings2', 'Salesforce Implementation', 'Salesforce implementation sets up your CRM from the ground up, configuring it to match your sales processes, teams, and business objectives.', 0),
  ('SlidersHorizontal', 'Salesforce Customisation', 'Salesforce customisation tailors objects, fields, layouts, and workflows so the platform fits your unique business needs rather than generic defaults.', 1),
  ('Plug', 'Salesforce Integration', 'Salesforce integration connects your CRM with other business tools and data sources, ensuring information flows seamlessly across your organisation.', 2),
  ('Code', 'Salesforce App Development (Lightning)', 'Salesforce app development using the Lightning platform builds custom applications directly within your CRM ecosystem to extend its core capabilities.', 3),
  ('Database', 'Salesforce Data Migration', 'Salesforce data migration moves your existing customer and business data into Salesforce accurately and securely, with minimal disruption.', 4),
  ('Workflow', 'Salesforce Automation (Flows & Apex)', 'Salesforce automation using Flows and Apex reduces manual work by automating repetitive tasks, approvals, and business logic within your CRM.', 5),
  ('Lightbulb', 'Salesforce CRM Consulting', 'Salesforce CRM consulting provides strategic guidance on platform adoption, optimisation, and best practices to maximise your return on investment.', 6),
  ('Wrench', 'Salesforce Support & Maintenance', 'Salesforce support and maintenance keep your CRM running smoothly with ongoing fixes, updates, and performance improvements.', 7)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'salesforce-development-consulting')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'salesforce-development-consulting');

insert into service_features (service_id, icon, title, description, sort_order)
select (select id from services where slug = 'cloud-migration-cloud-operations'), f.icon, f.title, f.description, f.ord
from (values
  ('ArrowUpRight', 'Cloud Migration Strategy', 'Cloud migration strategy assesses your current systems and designs a clear roadmap for moving applications and data to the cloud with minimal risk.', 0),
  ('Database', 'Application & Data Migration', 'Application and data migration moves your existing workloads and information to the cloud securely, preserving integrity and minimising downtime.', 1),
  ('Cloud', 'Cloud Infrastructure Setup', 'Cloud infrastructure setup configures scalable, secure environments on leading cloud platforms tailored to your performance and budget requirements.', 2),
  ('GitMerge', 'Multi-Cloud & Hybrid Cloud Solutions', 'Multi-cloud and hybrid cloud solutions combine multiple providers or on-premise systems with the cloud, giving you flexibility, redundancy, and control.', 3),
  ('PiggyBank', 'Cloud Cost Optimisation', 'Cloud cost optimisation reviews your infrastructure usage to eliminate waste and ensure you only pay for the resources your business actually needs.', 4),
  ('ShieldCheck', 'Cloud Security & Compliance', 'Cloud security and compliance implement access controls, encryption, and monitoring to protect your data and meet industry regulations.', 5),
  ('Workflow', 'DevOps & Cloud Automation', 'DevOps and cloud automation streamline deployment, scaling, and monitoring through automated pipelines and infrastructure-as-code practices.', 6),
  ('Activity', 'Cloud Monitoring & Managed Operations', 'Cloud monitoring and managed operations provide ongoing oversight of your cloud environment, ensuring consistent uptime, performance, and rapid issue resolution.', 7)
) as f(icon, title, description, ord)
where exists (select 1 from services where slug = 'cloud-migration-cloud-operations')
  and not exists (select 1 from service_features sf join services s on s.id = sf.service_id where s.slug = 'cloud-migration-cloud-operations');
