import type { Metadata } from "next";
import { YoutubeChannelManagementPage } from "@/components/services/YoutubeChannelManagementPage";
import { youtubeFaqs } from "@/lib/youtube-management-content";

const URL = "https://thesocialnexus.co.uk/youtube-channel-management";
const TITLE = "YouTube Channel Management Services | Social Nexus";
const DESCRIPTION =
  "Hand over your YouTube channel. We manage strategy, thumbnails, editing, publishing and reporting while you focus on recording. Book a free audit.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/youtube-channel-management" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
    images: [
      {
        url: "/youtube/hero.jpg",
        width: 1920,
        height: 1280,
        alt: "YouTube channel management by Social Nexus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/youtube/hero.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "YouTube Channel Management",
      serviceType: "YouTube channel management",
      description: DESCRIPTION,
      url: URL,
      areaServed: ["GB", "US", "PK"],
      provider: {
        "@type": "Organization",
        name: "Social Nexus",
        url: "https://thesocialnexus.co.uk",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://thesocialnexus.co.uk",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "YouTube Channel Management",
          item: URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: youtubeFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Escape "<" so FAQ text can never close the script tag.
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <YoutubeChannelManagementPage />
    </>
  );
}
