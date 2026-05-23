import type { Locale } from "./copy";

export const site = {
  origin: "https://gamubaby.gamublocks.com",
  name: "Gamu Baby",
  title: "Gamu Baby - Baby Milestone & Diary App for Android",
  description:
    "Track baby milestones, feeding, diapers, sleep, growth, photos, and memories offline. Gamu Baby is a private Android baby diary with no account, cloud sync, or ads.",
  playUrl: "https://play.google.com/store/apps/details?id=com.gamublocks.gamubaby",
  developerUrl: "https://play.google.com/store/apps/dev?id=8831894198403002159",
  supportEmail: "mailto:support@gamublocks.com",
  themeColor: "#f6f2ea",
  image: "/assets/05-share.webp",
  imageFallback: "/assets/05-share.png",
};

export const locales = {
  en: { label: "EN", name: "English", path: "/" },
  ja: { label: "日本語", name: "日本語", path: "/ja/" },
  pt: { label: "PT", name: "Português", path: "/pt/" },
  es: { label: "ES", name: "Español", path: "/es/" },
  ko: { label: "한국어", name: "한국어", path: "/ko/" },
} as const satisfies Record<Locale, { label: string; name: string; path: string }>;

export const languageTags = {
  en: "en",
  ja: "ja",
  pt: "pt",
  es: "es",
  ko: "ko",
} as const satisfies Record<Locale, string>;

export const screenshotMeta = {
  "01-milestones": {
    width: 1080,
    height: 1780,
    alt: "Gamu Baby milestone tracker screen with age-based developmental milestones.",
  },
  "02-checklist": {
    width: 1080,
    height: 1780,
    alt: "Gamu Baby age-based baby milestone checklist screen.",
  },
  "03-diary": {
    width: 1080,
    height: 1780,
    alt: "Gamu Baby diary log screen for sleep, feeding, diapers, and growth records.",
  },
  "04-journey": {
    width: 1080,
    height: 1780,
    alt: "Gamu Baby Journey timeline screen with baby photos and memories.",
  },
  "05-share": {
    width: 1080,
    height: 1780,
    alt: "Gamu Baby shareable milestone card preview screen.",
  },
  "05-share-with-grandparents": {
    width: 1080,
    height: 1780,
    alt: "Gamu Baby milestone sharing preview for family.",
  },
  logo: {
    width: 512,
    height: 512,
    alt: "Gamu Baby app icon.",
  },
} as const;

export const featurePages = [
  {
    slug: "baby-milestone-tracker",
    title: "Baby Milestone Tracker for Android",
    description:
      "Track 142 developmental milestones from birth to 60 months, attach photos, and keep a private baby milestone history offline.",
    h1: "Baby milestone tracker for quiet, private progress records.",
    summary:
      "Gamu Baby helps parents record developmental milestones, photo memories, and age-based checklists without making a cloud account.",
    sections: [
      ["142 developmental milestones", "Follow birth-to-60-month moments across movement, language, social, vision, and hearing categories."],
      ["Photo memories", "Attach photos and short notes so milestones become a baby book, not just a checklist."],
      ["Private by default", "Milestone data stays on the device unless a parent chooses to export or share it."],
    ],
  },
  {
    slug: "baby-diary-app",
    title: "Private Baby Diary App for Android",
    description:
      "Log feeding, diapers, sleep, growth, health notes, photos, and memories in a private Android baby diary that works offline.",
    h1: "Private baby diary app for everyday care.",
    summary:
      "Use Gamu Baby as a calm daily baby care log for feeding, diapers, sleep, growth, health notes, and memory keeping.",
    sections: [
      ["Daily care logs", "Record nursing, bottles, diapers, sleep, awake time, growth, and health notes in a few taps."],
      ["Timeline for caregivers", "See the day in order so parents and trusted caregivers can understand what happened."],
      ["Export when needed", "Create share cards or PDFs only when you choose to send information outside the phone."],
    ],
  },
  {
    slug: "private-offline-baby-tracker",
    title: "Private Offline Baby Tracker",
    description:
      "Gamu Baby is an offline-first baby tracker for Android with no account, no cloud sync, no ads, and local backup export.",
    h1: "Private offline baby tracker with no account.",
    summary:
      "Gamu Baby is built for parents who want useful baby tracking without account setup, background cloud sync, or ad tracking.",
    sections: [
      ["No account required", "Open the app and start logging baby care without email, password, or sign-up."],
      ["Offline-first records", "Care logs, photos, notes, milestones, and backups stay local unless you share them."],
      ["No ads", "The landing page and app story avoid ad-driven data collection claims and focus on parent-controlled exports."],
    ],
  },
] as const;

export const utilityPages = [
  {
    slug: "privacy",
    title: "Gamu Baby Privacy",
    description:
      "How Gamu Baby keeps baby care logs, milestone records, photos, and memories private by default.",
    h1: "Privacy by design.",
    summary:
      "Gamu Baby is designed around local records, parent-controlled exports, no accounts, and no advertising network watching your child grow.",
    sections: [
      ["Local records", "Logs, photos, milestones, and notes live on the parent device."],
      ["Controlled exports", "PDFs, backup files, and share cards leave the phone only when a parent chooses to send them."],
      ["No login funnel", "There is no account form or password collection on this static landing site."],
    ],
  },
  {
    slug: "faq",
    title: "Gamu Baby FAQ",
    description:
      "Answers about Gamu Baby baby milestone tracking, diary logs, offline use, privacy, Pro, and Android availability.",
    h1: "Frequently asked questions.",
    summary:
      "Quick answers for parents comparing Gamu Baby with cloud baby trackers, baby diary apps, and milestone checklist apps.",
    sections: [
      ["Is Gamu Baby for Android?", "Yes. The landing page links to the Android app on Google Play."],
      ["Does it require an account?", "No. Gamu Baby is designed to work without account setup or cloud sync."],
      ["What can I track?", "Milestones, feeding, diapers, sleep, growth, photos, memories, and health notes."],
    ],
  },
  {
    slug: "updates",
    title: "Gamu Baby Updates",
    description:
      "Recent Gamu Baby landing page and app-positioning updates for milestone tracking, baby diary logs, privacy, and Android SEO.",
    h1: "Gamu Baby updates.",
    summary:
      "A static changelog-style page for crawlable product context and release messaging, without collecting user data.",
    sections: [
      ["Astro static landing page", "The landing page now renders as static HTML for faster indexing and better GitHub Pages reliability."],
      ["SEO alignment", "Homepage copy now emphasizes baby milestones, diary tracking, Android availability, and offline privacy."],
      ["Crawlable pages", "Feature, privacy, FAQ, and update pages give search engines real routes instead of fragment-only sections."],
    ],
  },
] as const;

export type StaticPage = (typeof featurePages)[number] | (typeof utilityPages)[number];
