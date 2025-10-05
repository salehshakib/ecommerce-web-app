"use client";

import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featuredBoutiques = [
  {
    id: "1",
    name: "Parfums de Marly Flagship Dhaka",
    location: "Jamuna Future Park, Dhaka",
    description: "Our flagship store in the heart of Dhaka, featuring our complete collection and exclusive services.",
    image: "/api/placeholder/500/300",
    features: ["Complete Collection", "Personal Shopping", "Fragrance Consultation", "Gift Services"],
    hours: "Daily: 10AM-10PM",
    phone: "+880 2 9876543",
    isNew: true
  },
  {
    id: "2",
    name: "Parfums de Marly Gulshan",
    location: "Gulshan 1, Dhaka",
    description: "Located in the upscale Gulshan area, offering luxury fragrance experiences in an elegant setting.",
    image: "/api/placeholder/500/300",
    features: ["Exclusive Collections", "VIP Services", "Custom Engraving", "Private Consultations"],
    hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-8PM",
    phone: "+880 2 8876543",
    isNew: false
  },
  {
    id: "3",
    name: "Parfums de Marly Chittagong",
    location: "GEC Circle, Chittagong",
    description: "Our port city boutique showcases the heritage and elegance of French perfumery.",
    image: "/api/placeholder/500/300",
    features: ["Heritage Collection", "Fragrance Workshops", "Personal Shopping", "Exclusive Collections"],
    hours: "Mon-Sat: 10AM-8PM, Sun: 2PM-8PM",
    phone: "+880 31 765432",
    isNew: false
  }
];

export function BoutiquesShowcase() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-light mb-4 tracking-wider text-gray-900">
          OUR <span className="text-gray-500">BOUTIQUES</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Visit our luxury boutiques across Bangladesh for an immersive fragrance experience. 
          Each location offers personalized service and exclusive collections.
        </p>
      </div>

      <div className="space-y-12">
        {featuredBoutiques.map((boutique, index) => (
          <div 
            key={boutique.id} 
            className={`flex flex-col lg:flex-row gap-8 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image */}
            <div className="lg:w-1/2 relative">
              <div 
                className="h-80 bg-cover bg-center rounded-lg relative overflow-hidden"
                style={{ backgroundImage: `url(${boutique.image})` }}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                {boutique.isNew && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">
                      New Location
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h3 className="text-3xl font-semibold mb-2 text-gray-900">
                  {boutique.name}
                </h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{boutique.location}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {boutique.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold mb-3 text-gray-900">Services & Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {boutique.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="w-3 h-3 mr-2 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{boutique.hours}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{boutique.phone}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="bg-primary hover:bg-primary/90">
                  Visit Store
                </Button>
                <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
                  Get Directions
                </Button>
                <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
                  Call Store
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-3xl font-semibold mb-4 text-gray-900">
            Experience Luxury in Person
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Book a private consultation at any of our boutiques for a personalized fragrance journey. 
            Our expert consultants will help you discover your perfect scent.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Book Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
              View All Locations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}