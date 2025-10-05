"use client";

import { useCombinedDataContext } from "@/providers/combined-data-provider";
import { ClassForm } from "@/components/class-form";
import Image from "next/image";

export default function PrivateClassPage() {
  const { settings } = useCombinedDataContext();
  const upcomingClasses = settings?.upcomingClasses || [];

  // Use the first class image as the hero background, or a fallback
  const heroImage = upcomingClasses.length > 0 ? upcomingClasses[0].image : "/boutique-paris.jpg";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url('${heroImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-light mb-6 tracking-wider">
              PRIVATE <span className="text-primary">CLASSES</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl mx-auto">
              Learn the art of perfume creation in our exclusive workshops led by master perfumers
            </p>
          </div>
        </div>
      </section>

      {/* Available Classes Section */}
      {upcomingClasses.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light mb-4 tracking-wider">
                UPCOMING <span className="text-muted-foreground">CLASSES</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose from our carefully curated selection of perfume workshops
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {upcomingClasses.map((classItem, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={classItem.image}
                      alt={classItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2 tracking-wider">
                      {classItem.title}
                    </h3>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{new Date(classItem.date).toLocaleDateString()}</span>
                      <span>{classItem.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Class Booking Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ClassForm />
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-8 tracking-wider">
              WHAT YOU'LL <span className="text-muted-foreground">LEARN</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Fragrance Fundamentals",
                description:
                  "Understand the basic principles of perfumery, including fragrance families, notes, and composition structures.",
              },
              {
                title: "Ingredient Knowledge",
                description:
                  "Learn about essential oils, absolutes, and synthetic ingredients used in modern perfumery.",
              },
              {
                title: "Blending Techniques",
                description:
                  "Master the art of combining different notes to create harmonious and balanced fragrances.",
              },
              {
                title: "Personal Signature Scent",
                description:
                  "Create your own unique fragrance that reflects your personality and preferences.",
              },
              {
                title: "Perfume History",
                description:
                  "Discover the rich history of perfumery and its evolution through different cultures and eras.",
              },
              {
                title: "Professional Tips",
                description:
                  "Gain insights from master perfumers and learn industry secrets and best practices.",
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
