// Shared by the server route (JSON-LD) and the client page component, so the
// FAQ markup can never drift from what is rendered on screen.

export const youtubeFaqs = [
  {
    question: "What does “we run your channel” actually include?",
    answer:
      "We handle the work around the camera: topic research, titles and thumbnails, editing, publishing, Shorts distribution and performance reporting. Your main job is to record. The exact scope is agreed with you after the audit, so you only pay for what your channel needs.",
  },
  {
    question: "Will the videos still sound and feel like me?",
    answer:
      "Yes. Your voice, opinions and expertise stay at the centre of every video. We learn your style during onboarding and you approve the plan before anything goes live, so the channel grows without turning into someone else's.",
  },
  {
    question: "Does this work for my niche?",
    answer:
      "The system is the same across niches: find topics people already want, package them so they get clicked, and edit so viewers stay. What changes is the research. The free audit tells you honestly whether your channel is a good fit.",
  },
  {
    question: "How long before I see results?",
    answer:
      "We can't promise numbers or timelines, and anyone who does is guessing. The first weeks go into the audit, strategy and building a repeatable production workflow. After that we publish, test packaging and use the data to improve every upload.",
  },
  {
    question: "How much does YouTube channel management cost?",
    answer:
      "It depends on how many videos you publish and how much of the process you want us to own. After the audit we send a clear proposal with scope and pricing, so there are no surprises.",
  },
  {
    question: "What happens on the free audit?",
    answer:
      "We review your channel, titles, thumbnails and retention signals, then send you a short list of specific fixes. There is no obligation to continue with us afterwards.",
  },
  {
    question: "Do I need a minimum number of subscribers?",
    answer:
      "No fixed minimum. Channels that already post consistently and want to break through a plateau usually get the most from managed growth. If we think another approach would serve you better, we'll say so.",
  },
];

export type YoutubeShowcaseItem = {
  channel: string;
  niche: string;
  /** Text printed on the CSS-generated thumbnail. */
  thumbnailText: string;
  duration: string;
  /** Two CSS colours for the thumbnail gradient. */
  colors: [string, string];
  subsBefore: string;
  subsAfter: string;
  viewsBefore: string;
  viewsAfter: string;
};

// PLACEHOLDER DATA: fictional channels and invented figures, used only to
// design the showcase. Replace with verified client results (or empty the
// array to hide the section) before this page goes live. The UI labels every
// card "Sample" so it can't be mistaken for a real result in the meantime.
export const youtubeShowcasePlaceholder = true;

export const youtubeShowcase: YoutubeShowcaseItem[] = [
  {
    channel: "Northwind Finance",
    niche: "Personal finance",
    thumbnailText: "Why your savings are shrinking",
    duration: "12:41",
    colors: ["#0f766e", "#0b1020"],
    subsBefore: "28K",
    subsAfter: "214K",
    viewsBefore: "4.2K",
    viewsAfter: "41K",
  },
  {
    channel: "Studio Kintsugi",
    niche: "Design & creativity",
    thumbnailText: "I rebuilt a brand in 24 hours",
    duration: "18:03",
    colors: ["#b45309", "#1e1b4b"],
    subsBefore: "9.8K",
    subsAfter: "87K",
    viewsBefore: "1.9K",
    viewsAfter: "22K",
  },
  {
    channel: "The Daily Lathe",
    niche: "Woodworking",
    thumbnailText: "The joint nobody teaches",
    duration: "9:27",
    colors: ["#7c2d12", "#111827"],
    subsBefore: "41K",
    subsAfter: "186K",
    viewsBefore: "7.5K",
    viewsAfter: "38K",
  },
  {
    channel: "Fit in 15",
    niche: "Health & fitness",
    thumbnailText: "15 minutes. No equipment.",
    duration: "15:00",
    colors: ["#1d4ed8", "#0b1020"],
    subsBefore: "15K",
    subsAfter: "129K",
    viewsBefore: "3.1K",
    viewsAfter: "33K",
  },
  {
    channel: "Sky Atlas",
    niche: "Travel",
    thumbnailText: "The island tourists never find",
    duration: "21:14",
    colors: ["#9d174d", "#172554"],
    subsBefore: "52K",
    subsAfter: "240K",
    viewsBefore: "9.0K",
    viewsAfter: "56K",
  },
];
