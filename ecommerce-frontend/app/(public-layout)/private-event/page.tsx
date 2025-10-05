"use client";

import { useCombinedDataContext } from "@/providers/combined-data-provider";
import { EventForm } from "@/components/event-form";
import Image from "next/image";

export default function PrivateEventPage() {
  const { settings } = useCombinedDataContext();
  const eventData = settings?.event;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: eventData?.images?.[0]
            ? `url('${eventData.images[0]}')`
            : "url('/boutique-paris.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-light mb-6 tracking-wider">
              PRIVATE <span className="text-primary">EVENTS</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl mx-auto">
              {eventData?.description ||
                "Create unforgettable moments with our exclusive private event experiences"}
            </p>
          </div>
        </div>
      </section>

      {/* Two Images Section */}
      {eventData?.images && eventData.images.length === 2 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src={eventData.images[0]}
                  alt="Private Event Experience 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src={eventData.images[1]}
                  alt="Private Event Experience 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Event Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <EventForm />
        </div>
      </section>
    </div>
  );
}
