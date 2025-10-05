"use client";

import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCombinedDataContext } from "@/providers/combined-data-provider";

export default function ContactPage() {
  const { settings } = useCombinedDataContext();
  const contactInfo = settings?.contactInfo;
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/palace-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-6xl font-light mb-6 tracking-wider">
            CONTACT <span className="text-primary">US</span>
          </h1>
          <p className="text-xl max-w-2xl text-center">
            Get in touch with our team for personalized assistance and fragrance consultation
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-8 tracking-wider">
                GET IN <span className="text-muted-foreground">TOUCH</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our luxury fragrance experts are here to help you discover your perfect scent
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Phone Numbers */}
              <Card className="text-center p-8 border-0 shadow-lg">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-light mb-6">Call Us</CardTitle>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Customer Service</p>
                      <a
                        href={`tel:${contactInfo?.contactNumber}`}
                        className="text-lg hover:text-primary transition-colors"
                      >
                        {contactInfo?.contactNumber || "+1 234-567-8900"}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">General Inquiries</p>
                      <a
                        href={`tel:${contactInfo?.phoneNumber}`}
                        className="text-lg hover:text-primary transition-colors"
                      >
                        {contactInfo?.phoneNumber || "+1 234-567-8901"}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="text-center p-8 border-0 shadow-lg">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-light mb-6">Email Us</CardTitle>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Customer Support</p>
                      <a
                        href={`mailto:${contactInfo?.emailAddress}`}
                        className="text-lg hover:text-primary transition-colors break-all"
                      >
                        {contactInfo?.emailAddress || "support@perfumehouse.com"}
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="text-center p-8 border-0 shadow-lg">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-light mb-6">Follow Us</CardTitle>
                  <div className="flex justify-center gap-6">
                    {contactInfo?.facebook && (
                      <a
                        href={contactInfo.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                          <Facebook className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-sm mt-2 text-muted-foreground group-hover:text-primary transition-colors text-center">Facebook</p>
                      </a>
                    )}

                    {contactInfo?.instagram && (
                      <a
                        href={contactInfo.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                          <Instagram className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-sm mt-2 text-muted-foreground group-hover:text-primary transition-colors text-center">Instagram</p>
                      </a>
                    )}

                    {contactInfo?.youtube && (
                      <a
                        href={contactInfo.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                          <Youtube className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-sm mt-2 text-muted-foreground group-hover:text-primary transition-colors text-center">YouTube</p>
                      </a>
                    )}
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground">
                      Stay updated with our latest fragrances
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Form - Commented Out */}
      {/*
      <div className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact us</h2>
          <form className="space-y-8">
            // Form fields would go here
          </form>
        </div>
      </div>
      */}

      {/* Footer Section with Palace Image */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('/palace-footer.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex items-center justify-between h-full text-white px-6">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Can't find what you need ?
              </h3>
              <p className="text-lg">Our Team Is here to help</p>
            </div>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
