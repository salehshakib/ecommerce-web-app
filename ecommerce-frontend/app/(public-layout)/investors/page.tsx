"use client";

import { useCombinedDataContext } from "@/providers/combined-data-provider";
import { InvestorForm } from "@/components/investor-form";
import Image from "next/image";

export default function InvestorsPage() {
  const { settings } = useCombinedDataContext();
  const investorData = settings?.investor;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: investorData?.images?.[0]
            ? `url('${investorData.images[0]}')`
            : "url('/boutique-paris.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-light mb-6 tracking-wider">
              INVESTMENT <span className="text-primary">OPPORTUNITIES</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl mx-auto">
              {investorData?.description ||
                "Partner with us to build the future of luxury fragrance experiences"}
            </p>
          </div>
        </div>
      </section>

      {/* Two Images Section */}
      {investorData?.images && investorData.images.length === 2 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src={investorData.images[0]}
                  alt="Investment Opportunity 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src={investorData.images[1]}
                  alt="Investment Opportunity 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Investment Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <InvestorForm />
        </div>
      </section>

      {/* Investment Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-8 tracking-wider">
              WHY INVEST <span className="text-muted-foreground">WITH US</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Luxury Market Growth",
                description:
                  "The luxury fragrance market is experiencing unprecedented growth with increasing demand for premium, personalized experiences.",
              },
              {
                title: "Expert Craftsmanship",
                description:
                  "Our master perfumers bring decades of experience and exclusive access to the finest ingredients from around the world.",
              },
              {
                title: "Unique Positioning",
                description:
                  "We combine traditional perfumery artistry with modern retail innovation to create truly distinctive customer experiences.",
              },
              {
                title: "Scalable Business Model",
                description:
                  "Our proven systems and processes are designed for sustainable growth across multiple markets and customer segments.",
              },
              {
                title: "Strong Brand Foundation",
                description:
                  "Built on principles of quality, exclusivity, and customer satisfaction with a growing base of loyal clientele.",
              },
              {
                title: "Strategic Partnerships",
                description:
                  "Established relationships with premium suppliers, luxury retailers, and industry leaders provide competitive advantages.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 bg-background rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
