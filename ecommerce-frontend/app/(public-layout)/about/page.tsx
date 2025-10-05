"use client";

import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata-generator";
import { Crown, Sparkles, Award, Users, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCombinedDataContext } from "@/providers/combined-data-provider";
import Link from "next/link";

export default function AboutPage() {
  const { settings } = useCombinedDataContext();
  const aboutUs = settings?.aboutUs;
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: aboutUs?.aboutUsImage
            ? `url('${aboutUs.aboutUsImage}')`
            : "url('/boutique-paris.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-light mb-6 tracking-wider">
              ABOUT <span className="text-primary">US</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl mx-auto">
              {aboutUs?.description ||
                "Discover our story of luxury fragrances and exceptional craftsmanship"}
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="flex justify-center mb-6">
              <Crown className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-4xl font-light mb-8 tracking-wider">
              OUR <span className="text-muted-foreground">STORY</span>
            </h2>
            <div className="text-lg text-muted-foreground leading-relaxed">
              <p className="mb-8">
                {aboutUs?.description ||
                  "We are dedicated to creating exceptional luxury fragrances that tell a story of refinement and sophistication."}
              </p>
              <p>
                Our commitment to quality and authenticity has made us a trusted
                name in luxury perfumery, delivering worldwide with products
                that represent the finest in fragrance craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-8 tracking-wider">
              OUR <span className="text-muted-foreground">VALUES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Sparkles className="w-12 h-12 text-primary" />,
                title: "Excellence",
                description:
                  "We pursue perfection in every fragrance, using only the finest ingredients and master craftsmanship.",
              },
              {
                icon: <Award className="w-12 h-12 text-primary" />,
                title: "Heritage",
                description:
                  "Rooted in French tradition, our creations honor centuries of perfumery expertise and luxury.",
              },
              {
                icon: <Heart className="w-12 h-12 text-primary" />,
                title: "Passion",
                description:
                  "Every bottle embodies our love for the art of fragrance and dedication to olfactory beauty.",
              },
              {
                icon: <Users className="w-12 h-12 text-primary" />,
                title: "Craftsmanship",
                description:
                  "Our master perfumers blend tradition with innovation to create timeless fragrances.",
              },
              {
                icon: <Globe className="w-12 h-12 text-primary" />,
                title: "Global Presence",
                description:
                  "From Paris to New York, we bring French luxury and elegance to the world.",
              },
              {
                icon: <Crown className="w-12 h-12 text-primary" />,
                title: "Luxury",
                description:
                  "We create more than fragrances; we craft experiences of unparalleled luxury and sophistication.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-background rounded-lg shadow-sm"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      {/* <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "15+", label: "Years of Excellence" },
              { number: "50+", label: "Unique Fragrances" },
              { number: "30+", label: "Countries Worldwide" },
              { number: "100+", label: "Luxury Boutiques" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-light text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Master Perfumers */}
      {/* <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-8 tracking-wider">
              MASTER <span className="text-muted-foreground">PERFUMERS</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our fragrances are created by world-renowned perfumers who bring
              decades of expertise and passion to every composition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Hamid Merati-Kashani",
                role: "Master Perfumer",
                image: "/professional-cto-headshot.png",
                signature: "Known for bold, sophisticated compositions",
              },
              {
                name: "Nathalie Lorson",
                role: "Senior Perfumer",
                image: "/professional-man-sustainable-sourcing-expert.jpg",
                signature: "Expert in floral and woody accords",
              },
              {
                name: "Quentin Bisch",
                role: "Creative Director",
                image: "/professional-cto-headshot.png",
                signature: "Pioneer of modern luxury fragrances",
              },
            ].map((perfumer, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-48 h-48 mx-auto mb-4 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url(${perfumer.image})` }}
                ></div>
                <h3 className="text-xl font-semibold mb-1">{perfumer.name}</h3>
                <Badge variant="secondary" className="mb-2">
                  {perfumer.role}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {perfumer.signature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Sustainability */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-8 tracking-wider">
              OUR <span className="text-muted-foreground">COMMITMENT</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We are committed to sustainable luxury, working with responsible
              suppliers and supporting local communities. Our packaging is
              designed with environmental consciousness while maintaining the
              highest standards of luxury presentation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">Sustainable Sourcing</h3>
                <p className="text-sm text-muted-foreground">
                  Ethically sourced ingredients from trusted partners worldwide
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">Eco-Conscious Packaging</h3>
                <p className="text-sm text-muted-foreground">
                  Recyclable materials without compromising luxury quality
                </p>
              </div>
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">Community Support</h3>
                <p className="text-sm text-muted-foreground">
                  Supporting local communities and artisan partners
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Experience Our Heritage
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our collection of luxury fragrances and experience the art
            of French perfumery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collections">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore Collection
              </Button>
            </Link>
            <Link href="/store-locator">
              <Button size="lg" variant="outline">
                Visit Our Boutiques
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
