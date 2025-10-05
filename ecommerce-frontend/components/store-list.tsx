"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  hours: string;
  services: string[];
}

const stores: Store[] = [
  {
    id: "1",
    name: "Parfums de Marly Dhaka",
    address: "Level 4, Jamuna Future Park",
    city: "Dhaka",
    country: "Bangladesh",
    coordinates: { lat: 23.8103, lng: 90.4125 },
    phone: "+880 2 9876543",
    hours: "Daily: 10AM-10PM",
    services: ["Fragrance Consultation", "Gift Wrapping", "Personal Shopping"]
  },
  {
    id: "2", 
    name: "Parfums de Marly Gulshan",
    address: "House 15, Road 27, Gulshan 1",
    city: "Dhaka",
    country: "Bangladesh",
    coordinates: { lat: 23.7925, lng: 90.4078 },
    phone: "+880 2 8876543",
    hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-8PM",
    services: ["Fragrance Consultation", "Exclusive Collections", "VIP Services"]
  },
  {
    id: "3",
    name: "Parfums de Marly Chittagong",
    address: "GEC Circle, Chittagong Medical College Road",
    city: "Chittagong", 
    country: "Bangladesh",
    coordinates: { lat: 22.3569, lng: 91.7832 },
    phone: "+880 31 765432",
    hours: "Mon-Sat: 10AM-8PM, Sun: 2PM-8PM",
    services: ["Fragrance Consultation", "Custom Engraving", "Exclusive Collections"]
  },
  {
    id: "4",
    name: "Parfums de Marly Sylhet",
    address: "Zindabazar Commercial Area",
    city: "Sylhet",
    country: "Bangladesh", 
    coordinates: { lat: 24.8949, lng: 91.8687 },
    phone: "+880 821 654321",
    hours: "Daily: 10AM-9PM",
    services: ["Fragrance Consultation", "Gift Wrapping", "Personal Shopping"]
  },
  {
    id: "5",
    name: "Parfums de Marly Rajshahi",
    address: "Saheb Bazar Road, Near Varendra University",
    city: "Rajshahi",
    country: "Bangladesh",
    coordinates: { lat: 24.3745, lng: 88.6042 },
    phone: "+880 721 543210",
    hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-7PM",
    services: ["Fragrance Consultation", "Personal Shopping", "VIP Services"]
  }
];

export function StoreList() {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  return (
    <div className="h-full flex flex-col">
      {/* Store Count */}
      <div className="px-4 py-4 text-sm text-gray-600 border-b border-gray-200">
        {stores.length} store{stores.length !== 1 ? 's' : ''} in Bangladesh
      </div>

      {/* Store List */}
      <div className="flex-1 overflow-y-auto">
        {stores.map((store) => (
          <div
            key={store.id}
            className={`p-4 border-b border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${
              selectedStore?.id === store.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
            }`}
            onClick={() => setSelectedStore(selectedStore?.id === store.id ? null : store)}
          >
            {/* Store Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{store.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{store.city}, {store.country}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-200">
                Open
              </Badge>
            </div>

            {/* Store Details (Expanded) */}
            {selectedStore?.id === store.id && (
              <div className="mt-4 space-y-3 animate-in slide-in-from-top-2">
                {/* Address */}
                <div className="text-sm">
                  <div className="font-medium text-gray-900 mb-1">Address</div>
                  <div className="text-gray-600">{store.address}</div>
                  <div className="text-gray-600">{store.city}, {store.country}</div>
                </div>

                {/* Phone */}
                <div className="text-sm">
                  <div className="font-medium text-gray-900 mb-1 flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    Phone
                  </div>
                  <div className="text-gray-600">{store.phone}</div>
                </div>

                {/* Hours */}
                <div className="text-sm">
                  <div className="font-medium text-gray-900 mb-1 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Hours
                  </div>
                  <div className="text-gray-600">{store.hours}</div>
                </div>

                {/* Services */}
                <div className="text-sm">
                  <div className="font-medium text-gray-900 mb-2">Services</div>
                  <div className="flex flex-wrap gap-1">
                    {store.services.map((service, index) => (
                      <Badge key={index} className="text-xs bg-primary/10 text-primary border-primary/20">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 flex-1">
                    <Navigation className="w-4 h-4 mr-1" />
                    Get Directions
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 border-primary/20 text-primary hover:bg-primary/5">
                    <Phone className="w-4 h-4 mr-1" />
                    Call Store
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}