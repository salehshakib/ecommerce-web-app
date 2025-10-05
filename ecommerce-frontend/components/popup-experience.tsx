"use client";

import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const popupEvents = [
  {
    id: "1",
    title: "Parfums de Marly Pop-Up Experience",
    location: "Times Square, New York",
    date: "March 15-17, 2024",
    time: "10:00 AM - 8:00 PM",
    description: "Discover our exclusive fragrances in an immersive pop-up experience featuring personalized consultations and limited edition products.",
    image: "/api/placeholder/400/250",
    capacity: "Limited to 50 guests per day",
    status: "upcoming"
  },
  {
    id: "2", 
    title: "Fragrance Workshop & Tasting",
    location: "Covent Garden, London",
    date: "April 5-7, 2024",
    time: "11:00 AM - 7:00 PM",
    description: "Join our master perfumers for an exclusive workshop where you'll learn about fragrance creation and enjoy tastings of our newest collections.",
    image: "/api/placeholder/400/250",
    capacity: "Limited to 30 guests per session",
    status: "upcoming"
  },
  {
    id: "3",
    title: "VIP Fragrance Launch Event",
    location: "Champs-Élysées, Paris", 
    date: "May 20-22, 2024",
    time: "12:00 PM - 9:00 PM",
    description: "Be among the first to experience our latest fragrance collection in an exclusive VIP setting with champagne service and personal styling.",
    image: "/api/placeholder/400/250",
    capacity: "Invitation only - 40 VIP guests",
    status: "upcoming"
  }
];

export function PopUpExperience() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-light mb-4 tracking-wider">
          POP-UP <span className="text-muted-foreground">EXPERIENCES</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join us for exclusive pop-up experiences around the world. Discover our fragrances in unique, 
          immersive settings designed to transport you into the world of Parfums de Marly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {popupEvents.map((event) => (
          <div key={event.id} className="bg-card rounded-lg overflow-hidden shadow-sm border border-border/20 hover:shadow-md transition-shadow">
            {/* Event Image */}
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${event.image})` }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-amber-600 text-white">
                  {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
                </Badge>
              </div>
            </div>

            {/* Event Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {event.title}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{event.capacity}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {event.description}
              </p>

              <div className="flex gap-2">
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 flex-1"
                  disabled={event.status !== 'upcoming'}
                >
                  {event.status === 'upcoming' ? 'Reserve Spot' : 'View Details'}
                </Button>
                <Button variant="outline" size="sm">
                  Share
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <div className="bg-muted/50 rounded-lg p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">
            Be the first to know about our upcoming pop-up experiences and exclusive events.
          </p>
          <Button className="bg-amber-600 hover:bg-amber-700">
            Subscribe to Notifications
          </Button>
        </div>
      </div>
    </div>
  );
}