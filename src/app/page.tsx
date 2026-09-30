import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { CredentialsBar } from "@/components/sections/CredentialsBar";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { Guarantee } from "@/components/sections/Guarantee";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { MobileBar } from "@/components/sections/MobileBar";
import { QuoteProvider } from "@/components/ui/QuoteContext";
import { faqJsonLd, jsonLdString, localBusinessJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <QuoteProvider>
      <Header />
      <main>
        <Hero />
        <CredentialsBar />
        <Services />
        <WhyChooseUs />
        <HowItWorks />
        <Gallery />
        <Reviews />
        <Guarantee />
        <QuoteForm />
        <ServiceArea />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd) }} />
    </QuoteProvider>
  );
}
