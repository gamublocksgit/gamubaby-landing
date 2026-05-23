import { featurePages, locales, site, utilityPages } from "../data/site";

const routes = [
  ...Object.values(locales).map((locale) => locale.path),
  ...featurePages.map((page) => `/${page.slug}/`),
  ...utilityPages.map((page) => `/${page.slug}/`),
];

export function GET() {
  const urls = routes
    .map((route) => {
      const loc = new URL(route, site.origin).toString();
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
}
