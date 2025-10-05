"use client";

import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  hours: string;
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
    hours: "Daily: 10AM-10PM"
  },
  {
    id: "2", 
    name: "Parfums de Marly Gulshan",
    address: "House 15, Road 27, Gulshan 1",
    city: "Dhaka",
    country: "Bangladesh",
    coordinates: { lat: 23.7925, lng: 90.4078 },
    phone: "+880 2 8876543",
    hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-8PM"
  },
  {
    id: "3",
    name: "Parfums de Marly Chittagong",
    address: "GEC Circle, Chittagong Medical College Road",
    city: "Chittagong", 
    country: "Bangladesh",
    coordinates: { lat: 22.3569, lng: 91.7832 },
    phone: "+880 31 765432",
    hours: "Mon-Sat: 10AM-8PM, Sun: 2PM-8PM"
  },
  {
    id: "4",
    name: "Parfums de Marly Sylhet",
    address: "Zindabazar Commercial Area",
    city: "Sylhet",
    country: "Bangladesh", 
    coordinates: { lat: 24.8949, lng: 91.8687 },
    phone: "+880 821 654321",
    hours: "Daily: 10AM-9PM"
  },
  {
    id: "5",
    name: "Parfums de Marly Rajshahi",
    address: "Saheb Bazar Road, Near Varendra University",
    city: "Rajshahi",
    country: "Bangladesh",
    coordinates: { lat: 24.3745, lng: 88.6042 },
    phone: "+880 721 543210",
    hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-7PM"
  }
];

export function StoreMap() {
  const [selectedStore, setSelectedStore] = useState<Store | null>(stores[0]);

  return (
    <div className="h-full bg-gray-100 rounded-lg overflow-hidden relative">
      {/* Interactive Map */}
      <div className="w-full h-full relative overflow-hidden">
        {/* Bangladesh Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100">
          {/* Bangladesh outline placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-96 border-2 border-green-300 rounded-lg opacity-30"></div>
          </div>
        </div>

        {/* Map markers for Bangladesh locations */}
        {stores.map((store) => {
          // Calculate position for Bangladesh map (rough positioning)
          let left = 50; // Default center
          let top = 50;
          
          // Position based on city locations in Bangladesh
          if (store.city === "Dhaka") {
            left = 52; top = 45;
          } else if (store.city === "Chittagong") {
            left = 60; top = 70;
          } else if (store.city === "Sylhet") {
            left = 65; top = 25;
          } else if (store.city === "Rajshahi") {
            left = 35; top = 35;
          }

          return (
            <div
              key={store.id}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                selectedStore?.id === store.id ? 'z-20' : 'z-10'
              }`}
              style={{ left: `${left}%`, top: `${top}%` }}
              onClick={() => setSelectedStore(store)}
            >
              <div className={`relative ${selectedStore?.id === store.id ? 'scale-125' : ''} transition-transform`}>
                <MapPin 
                  className={`w-8 h-8 ${
                    selectedStore?.id === store.id 
                      ? 'text-primary fill-primary/10' 
                      : 'text-red-600 fill-red-100'
                  }`} 
                />
                
                {/* Store info popup */}
                {selectedStore?.id === store.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-xl p-4 min-w-[280px] border border-gray-200">
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {store.name}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {store.address}, {store.city}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {store.phone}
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      {store.hours}
                    </div>
                    <Button size="sm" className="text-xs bg-primary hover:bg-primary/90">
                      <Navigation className="w-3 h-3 mr-1" />
                      Get Directions
                    </Button>
                    
                    {/* Popup arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Map title overlay */}
        <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Store Locations in Bangladesh</h3>
          <p className="text-xs text-gray-600">Click markers to view details</p>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-sm">
          <div className="flex items-center text-xs text-gray-600 mb-1">
            <MapPin className="w-4 h-4 mr-2 text-red-600 fill-red-100" />
            <span>Store Location</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-primary fill-primary/10" />
            <span>Selected Store</span>
          </div>
        </div>
      </div>

      {/* Map controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
          +
        </Button>
        <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
          -
        </Button>
      </div>
    </div>
  );
}