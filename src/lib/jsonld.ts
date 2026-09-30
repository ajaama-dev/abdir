import { siteConfig } from "@/config/site";

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phoneTel,
  email: siteConfig.email,
  image: siteConfig.seo.heroImage,
  description: siteConfig.seo.description,
  priceRange: siteConfig.priceRange,
  openingHours: "Mo-Sa 07:00-19:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.locality,
    postalCode: siteConfig.address.postcode,
    addressCountry: siteConfig.address.country,
  },
  areaServed: siteConfig.towns.map((t) => ({ "@type": "City", name: t })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.rating,
    reviewCount: siteConfig.reviewCount,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: siteConfig.services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.description },
    })),
  },
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: siteConfig.faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

/** Serialise for a <script> tag, escaping "<" so content can never close the tag. */
export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
