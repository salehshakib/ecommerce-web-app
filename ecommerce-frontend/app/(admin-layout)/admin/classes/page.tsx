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
  Users,
  MoreVertical,
  Search,
  Loader2,
  Clock,
} from "lucide-react";
import { useClassBookingsQuery } from "@/hooks/queries/use-class-query";
import type { ClassBookingResponse } from "@/types/class";
import DeleteClassBookingModal from "@/components/classes/delete-class-booking-modal";

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

function getStatusBadge(isUpcoming: boolean) {
  return isUpcoming ? (
    <Badge variant="default">Upcoming</Badge>
  ) : (
    <Badge variant="secondary">Completed</Badge>
  );
}

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<ClassBookingResponse | null>(null);

  // Fetch class bookings using the query hook
  const { data: bookingsResponse, isLoading, error, refetch } = useClassBookingsQuery();

  const bookings = bookingsResponse?.bookings || [];

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.classType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.notes &&
        booking.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteBooking = (booking: ClassBookingResponse) => {
    setBookingToDelete(booking);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setBookingToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading class bookings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">Failed to load class bookings</p>
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
            Class Bookings
          </h1>
          <p className="text-gray-600">
            Manage customer class bookings and reservations
          </p>
        </div>
      </div>


      {/* Class Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Class Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => {
                const { date, time } = formatDateTime(booking.preferredDateTime);
                const isUpcoming = new Date(booking.preferredDateTime) > new Date();

                return (
                  <TableRow key={booking._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.name}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{booking.classType}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{date}</div>
                        <div className="text-sm text-gray-500">{time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{booking.numberOfParticipants}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{booking.phoneNumber}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(isUpcoming)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteBooking(booking)}
                          >
                            Delete Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Class Booking Modal */}
      <DeleteClassBookingModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        booking={bookingToDelete}
      />
    </div>
  );
}