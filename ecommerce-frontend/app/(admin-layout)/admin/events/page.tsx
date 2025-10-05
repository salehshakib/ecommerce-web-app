"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  MapPin,
  Users,
  MoreVertical,
  Plus,
  Search,
  Loader2,
} from "lucide-react";
import { useEventsQuery } from "@/hooks/queries/use-event-query";
import { useDeleteEventMutation } from "@/hooks/mutations/use-event-mutations";
import type { EventResponse } from "@/types/event";
import DeleteEventModal from "@/components/events/delete-event-modal";

// Helper function to format event type for display
function formatEventType(eventType: string): string {
  return (
    eventType.charAt(0).toUpperCase() + eventType.slice(1).replace("-", " ")
  );
}

// Helper function to format date and time
function formatDateTime(dateTime: string): { date: string; time: string } {
  const date = new Date(dateTime);
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

function getStatusBadge(status: string) {
  switch (status) {
    case "upcoming":
      return <Badge variant="default">Upcoming</Badge>;
    case "completed":
      return <Badge variant="secondary">Completed</Badge>;
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}

function getTypeBadge(type: string) {
  const formattedType = formatEventType(type);
  switch (type) {
    case "wedding":
      return (
        <Badge variant="outline" className="bg-pink-50 text-pink-700">
          {formattedType}
        </Badge>
      );
    case "corporate":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          {formattedType}
        </Badge>
      );
    case "birthday":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
          {formattedType}
        </Badge>
      );
    case "anniversary":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700">
          {formattedType}
        </Badge>
      );
    case "product-launch":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700">
          {formattedType}
        </Badge>
      );
    case "exhibition":
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-700">
          {formattedType}
        </Badge>
      );
    case "gala":
      return (
        <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
          {formattedType}
        </Badge>
      );
    case "private-party":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700">
          {formattedType}
        </Badge>
      );
    default:
      return <Badge variant="outline">{formattedType}</Badge>;
  }
}

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<EventResponse | null>(null);

  // Fetch events using the query hook
  const { data: eventsResponse, isLoading, error, refetch } = useEventsQuery();
  const deleteEventMutation = useDeleteEventMutation();

  const events = eventsResponse?.events || [];

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.specialRequests &&
        event.specialRequests.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteEvent = (event: EventResponse) => {
    setEventToDelete(event);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setEventToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading events...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">Failed to load events</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Private Event Requests
          </h1>
          <p className="text-gray-600">
            Manage customer private event requests
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No event requests found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Event Details</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => {
                  const { date, time } = formatDateTime(event.dateTime);
                  const isUpcoming = new Date(event.dateTime) > new Date();

                  return (
                    <TableRow key={event._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{event.name}</div>
                          <div className="text-sm text-gray-500">
                            {event.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {event.phoneNumber}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">Private Event</div>
                          {event.specialRequests && (
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {event.specialRequests}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <div>{date}</div>
                            <div className="text-sm text-gray-500">{time}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          {event.numberOfGuests}
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(event.eventType)}</TableCell>
                      <TableCell>
                        {getStatusBadge(isUpcoming ? "upcoming" : "completed")}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>
                              Contact Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteEvent(event)}
                            >
                              Delete Request
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Event Modal */}
      <DeleteEventModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        event={eventToDelete}
      />
    </div>
  );
}
