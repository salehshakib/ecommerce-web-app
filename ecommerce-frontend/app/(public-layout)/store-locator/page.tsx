"use client";

import { MapPin, Phone, Clock, Navigation, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCombinedDataContext } from "@/providers/combined-data-provider";

export default function StoreLocatorPage() {
  const { settings } = useCombinedDataContext();
  const storeLocation = settings?.storeLocation;

  const openInGoogleMaps = () => {
    if (storeLocation?.latitude && storeLocation?.longitude) {
      const url = `https://www.google.com/maps?q=${storeLocation.latitude},${storeLocation.longitude}`;
      window.open(url, '_blank');
    }
  };

  const openDirections = () => {
    if (storeLocation?.latitude && storeLocation?.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${storeLocation.latitude},${storeLocation.longitude}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-primary/10 to-primary/20">
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-light mb-6 tracking-wider">
              VISIT <span className="text-primary">OUR STORE</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience our luxury fragrances in person. Our expert consultants are ready to help you find your perfect scent.
            </p>
          </div>
        </div>
      </section>

      {/* Store Information */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Store Details Card */}
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-light">Store Location</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-6 flex-1">
                    {/* Store Name */}
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {storeLocation?.storeName || "Perfume House Main Branch"}
                      </h3>
                      <p className="text-muted-foreground">
                        {storeLocation?.storeAddress || "123 Luxury Street, New York, USA"}
                      </p>
                    </div>

                    {/* Coordinates */}
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Coordinates</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Latitude: {storeLocation?.latitude || "40.7128"}</p>
                        <p>Longitude: {storeLocation?.longitude || "-74.006"}</p>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium mb-2">Business Hours</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Monday - Friday: 10:00 AM - 8:00 PM</p>
                          <p>Saturday: 10:00 AM - 6:00 PM</p>
                          <p>Sunday: 12:00 PM - 5:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-auto">
                    <Button
                      onClick={openDirections}
                      className="flex items-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </Button>
                    <Button
                      variant="outline"
                      onClick={openInGoogleMaps}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on Google Maps
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Map */}
              <Card className="h-[600px]">
                <CardHeader>
                  <CardTitle className="text-2xl font-light">Find Us Here</CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[500px]">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919355!2d${storeLocation?.longitude || "-74.006"}!3d${storeLocation?.latitude || "40.7128"}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567890123`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: "0 0 8px 8px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Store Location Map"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-8 tracking-wider">
              NEED <span className="text-muted-foreground">ASSISTANCE?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions about our products or need personalized recommendations? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Call Us Now
              </Button>
              <Button size="lg" variant="outline">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}