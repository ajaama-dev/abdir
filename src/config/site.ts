// DEMO CONTENT: replace all values with the real client's verified details before launch. Do not publish demo reviews or accreditations as real.

export type NeedValue = "bathroom" | "boiler-heating" | "repair-leak" | "emergency" | "other";

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Which quote-form "need" tile this service pre-selects. */
  need: NeedValue;
}

export interface Review {
  name: string;
  town: string;
  service: string;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface GalleryItem {
  title: string;
  type: string;
  town: string;
  summary: string;
  image: string;
  imageAlt: string;
}

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const guaranteeYears = 10;
const responseTime = "within 2 working hours";
const phone = "020 7946 0321";
const accreditations = [
  "Gas Safe Registered",
  "WaterSafe Approved",
  "CIPHE Member",
  "Fully Insured to £5m",
];

export const siteConfig = {
  name: "Ashworth & Vale Plumbing & Heating",
  shortName: "Ashworth & Vale",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ashworthvale.co.uk",
  phone,
  phoneTel: "+442079460321",
  email: "enquiries@ashworthvale.co.uk",
  area: "South West London",
  towns: ["Wimbledon", "Putney", "Richmond", "Clapham", "Fulham", "Kingston"],
  rating: 4.9,
  reviewCount: 187,
  accreditations,
  guaranteeYears,
  responseTime,
  hours: "Mon to Sat, 7am to 7pm. 24/7 emergency line.",
  address: {
    street: "14 Lower Richmond Road",
    locality: "London",
    postcode: "SW15 1JP",
    country: "GB",
  },
  priceRange: "££££",
  seo: {
    description:
      "Accredited plumbing and heating engineers serving South West London. Bathroom installations, boilers, underfloor heating and emergency repairs, with fixed quotes and a 10-year workmanship guarantee.",
    heroImage: unsplash("1600566753086-00f18fb6b3ea", 2000),
    heroImageAlt:
      "A calm, modern bathroom with a freestanding bath, brushed brass fittings and natural stone tiling",
  },
  services: [
    {
      id: "bathrooms",
      title: "Bathroom Design & Installation",
      description:
        "A considered bathroom, planned around how you live and finished to a showroom standard. We coordinate every trade so you deal with one accountable team from survey to final polish.",
      image: unsplash("1552321554-5fefe8c9ef14", 1000),
      imageAlt: "A luxury bathroom with a freestanding bath and large format tiles",
      need: "bathroom",
    },
    {
      id: "boilers",
      title: "Boiler Installation & Replacement",
      description:
        "Efficient, quietly reliable heating from a Gas Safe registered engineer, sized correctly for your home. Installation is tidy, tested and fully commissioned, with the paperwork handled for you.",
      image: unsplash("1585128792020-803d29415281", 1000),
      imageAlt: "A modern wall-mounted boiler installed with neat copper pipework",
      need: "boiler-heating",
    },
    {
      id: "heating",
      title: "Central & Underfloor Heating",
      description:
        "Even, comfortable warmth in every room, designed around your layout and running costs. Systems are balanced and flushed properly so they perform quietly for years.",
      image: unsplash("1558618666-fcd25c85cd64", 1000),
      imageAlt: "Precisely fitted copper heating manifold and pipework",
      need: "boiler-heating",
    },
    {
      id: "leaks",
      title: "Leak Detection & Repairs",
      description:
        "We trace the source of a leak precisely, then repair it with minimal disruption to your decor. You receive a clear explanation and a fixed price before any work begins.",
      image: unsplash("1607472586893-edb57bdc0e39", 1000),
      imageAlt: "A plumbing engineer carefully repairing pipework beneath a basin",
      need: "repair-leak",
    },
    {
      id: "emergency",
      title: "24/7 Emergency Plumbing",
      description:
        "When something fails at the wrong moment, an engineer answers the phone and attends promptly. We make the situation safe first, then restore it properly.",
      image: unsplash("1621905251189-08b45d6a269e", 1000),
      imageAlt: "An engineer with a well-organised tool kit attending an emergency call-out",
      need: "emergency",
    },
  ] satisfies Service[],
  why: [
    {
      title: "We arrive when we say we will",
      text: "Every appointment is confirmed the day before, with a text when your engineer is on the way.",
    },
    {
      title: "Fixed quotes, never surprises",
      text: "You receive an itemised price in writing, and the figure you approve is the figure you pay.",
    },
    {
      title: "Your home left cleaner than we found it",
      text: "Dust sheets, shoe covers and a full clean-down at the end of every visit, as standard.",
    },
    {
      title: `${guaranteeYears} years of guaranteed peace of mind`,
      text: "Every installation carries our written workmanship guarantee, honoured without argument.",
    },
  ],
  steps: [
    {
      title: "Enquire",
      text: `Tell us what you need. We respond ${responseTime}.`,
    },
    {
      title: "Home survey",
      text: "An engineer visits, measures up and listens to what you want to achieve.",
    },
    {
      title: "Fixed itemised quote",
      text: "A clear written price covering materials, labour and completion date.",
    },
    {
      title: "Installation and aftercare",
      text: "Careful, tidy work followed by a full handover and your written guarantee.",
    },
  ],
  gallery: [
    {
      title: "Marble-effect family bathroom",
      type: "Bathroom installation",
      town: "Wimbledon",
      summary: "A full renovation with underfloor heating and a walk-in shower.",
      image: unsplash("1584622650111-993a426fbf0a", 1400),
      imageAlt: "A bright family bathroom with marble-effect tiles and a walk-in shower",
    },
    {
      title: "Freestanding bath suite",
      type: "Bathroom installation",
      town: "Richmond",
      summary: "A period home bathroom rebuilt around a freestanding bath.",
      image: unsplash("1620626011761-996317b8d101", 1400),
      imageAlt: "A freestanding bath beside a window in a refined period bathroom",
    },
    {
      title: "Concealed boiler upgrade",
      type: "Boiler replacement",
      town: "Putney",
      summary: "A high-efficiency boiler installed with fully concealed pipework.",
      image: unsplash("1585128792020-803d29415281", 1400),
      imageAlt: "A high-efficiency boiler neatly installed within a utility cupboard",
    },
    {
      title: "Whole-house underfloor heating",
      type: "Underfloor heating",
      town: "Kingston",
      summary: "Zoned underfloor heating across the ground floor of a Victorian home.",
      image: unsplash("1558618666-fcd25c85cd64", 1400),
      imageAlt: "Copper manifold and underfloor heating pipework laid before screeding",
    },
    {
      title: "Cloakroom refresh",
      type: "Bathroom installation",
      town: "Fulham",
      summary: "A compact cloakroom given a wall-hung suite and brushed brass taps.",
      image: unsplash("1604709177225-055f99402ea3", 1400),
      imageAlt: "A compact cloakroom with a wall-hung basin and brushed brass tap",
    },
    {
      title: "Kitchen and utility plumbing",
      type: "Plumbing installation",
      town: "Clapham",
      summary: "New supply and waste runs for an extended kitchen and utility room.",
      image: unsplash("1556909114-f6e7ad7d3136", 1400),
      imageAlt: "A contemporary kitchen with a fully plumbed sink and utility area",
    },
  ] satisfies GalleryItem[],
  reviews: [
    {
      name: "Charlotte",
      town: "Wimbledon",
      service: "Bathroom installation",
      text: "Our engineers arrived at eight sharp every morning and the bathroom is exactly as the drawings promised. The quote was itemised and did not move by a penny. The house was spotless each evening.",
    },
    {
      name: "James",
      town: "Putney",
      service: "Boiler replacement",
      text: "Replaced an ageing boiler in a single day. Punctual, courteous and they left no mess at all. The price was fair, and clearly explained before we agreed.",
    },
    {
      name: "Priya",
      town: "Richmond",
      service: "Leak repair",
      text: "A leak was damaging our ceiling and they found the source within the hour. Careful work, dust sheets everywhere and a sensible fixed price. I would not consider anyone else now.",
    },
    {
      name: "Oliver",
      town: "Clapham",
      service: "Underfloor heating",
      text: "The craftsmanship is superb, every pipe run is neat and labelled. They kept to the schedule we agreed and the house has never been warmer. Excellent value for work of this standard.",
    },
    {
      name: "Sophie",
      town: "Fulham",
      service: "Emergency plumbing",
      text: "Called late on a Sunday evening and an engineer was with us within the hour. Calm, professional and the repair was made properly rather than patched. The out-of-hours price was fully explained first.",
    },
    {
      name: "Henry",
      town: "Kingston",
      service: "Bathroom installation",
      text: "We have had tradespeople in before and this was a different level. Communication was clear throughout, the finish is immaculate and they cleaned everything before leaving. Worth every pound.",
    },
  ] satisfies Review[],
  faqs: [
    {
      question: "Are your quotes really fixed?",
      answer:
        "Yes. After your home survey you receive a written, itemised quote covering materials, labour and completion date. The price you approve is the price you pay, unless you choose to change the scope.",
    },
    {
      question: "Are you accredited and insured?",
      answer: `Our engineers are accredited: ${accreditations.join(", ")}. Certificates are available on request and issued after every gas or heating installation.`,
    },
    {
      question: "How soon can you start?",
      answer: `We respond to every enquiry ${responseTime}. Surveys are usually arranged within a few days, and most projects can begin within two to three weeks of accepting your quote.`,
    },
    {
      question: "What does your guarantee cover?",
      answer: `All installation work carries a ${guaranteeYears}-year written workmanship guarantee. If anything we have fitted fails through our workmanship, we return and put it right at no charge.`,
    },
    {
      question: "How do you protect my home while you work?",
      answer:
        "We lay dust sheets and floor protection before we begin, wear shoe covers indoors and clean thoroughly at the end of every day. Your home is left cleaner than we found it.",
    },
    {
      question: "Do you charge for emergency callouts?",
      answer: `Our emergency line is open 24 hours a day on ${phone}. Attendance and hourly rates are quoted clearly over the phone before an engineer is dispatched, so there are no surprises.`,
    },
  ] satisfies Faq[],
  privacyUpdated: "30 September 2026",
};

export type SiteConfig = typeof siteConfig;
