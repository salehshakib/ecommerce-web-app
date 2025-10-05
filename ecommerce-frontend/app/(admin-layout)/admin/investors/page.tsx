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
  DollarSign,
  TrendingUp,
  Users,
  MoreVertical,
  Search,
  Loader2,
} from "lucide-react";
import { useInvestorsQuery } from "@/hooks/queries/use-investor-query";
import { useDeleteInvestorMutation } from "@/hooks/mutations/use-investors-mutations";
import type { InvestorResponse } from "@/types/investor";
import DeleteInvestorModal from "@/components/investors/delete-investor-modal";

// Helper function to format investment type for display
function formatInvestmentType(investmentType: string): string {
  return (
    investmentType.charAt(0).toUpperCase() + investmentType.slice(1).replace("-", " ")
  );
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function getInvestmentAmountBadge(amount: number) {
  if (amount >= 1000000) {
    return <Badge variant="default" className="bg-green-600">High Value</Badge>;
  } else if (amount >= 500000) {
    return <Badge variant="secondary">Medium Value</Badge>;
  } else {
    return <Badge variant="outline">Standard</Badge>;
  }
}

function getInvestmentTypeBadge(type: string) {
  const formattedType = formatInvestmentType(type);
  switch (type) {
    case "partnership":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          {formattedType}
        </Badge>
      );
    case "equity":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700">
          {formattedType}
        </Badge>
      );
    case "loan":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
          {formattedType}
        </Badge>
      );
    case "franchise":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700">
          {formattedType}
        </Badge>
      );
    case "joint-venture":
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-700">
          {formattedType}
        </Badge>
      );
    case "other":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700">
          {formattedType}
        </Badge>
      );
    default:
      return <Badge variant="outline">{formattedType}</Badge>;
  }
}

export default function InvestorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [investorToDelete, setInvestorToDelete] = useState<InvestorResponse | null>(
    null
  );

  // Fetch investors using the query hook
  const { data: investorsResponse, isLoading, error, refetch } = useInvestorsQuery();
  const deleteInvestorMutation = useDeleteInvestorMutation();

  const investors = investorsResponse?.investors || [];

  const filteredInvestors = investors.filter(
    (investor) =>
      investor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.investmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (investor.message &&
        investor.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteInvestor = (investor: InvestorResponse) => {
    setInvestorToDelete(investor);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setInvestorToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading investors...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">Failed to load investors</p>
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
            Investment Inquiries
          </h1>
          <p className="text-gray-600">
            Manage investor inquiries and partnership requests
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{investors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${investors.reduce((sum, inv) => sum + inv.investmentAmount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Value Inquiries</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {investors.filter(inv => inv.investmentAmount >= 1000000).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search investors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Investment Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredInvestors.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No investment inquiries found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investor</TableHead>
                  <TableHead>Investment Details</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvestors.map((investor) => {
                  const createdDate = formatDate(investor.createdAt);

                  return (
                    <TableRow key={investor._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{investor.fullName}</div>
                          <div className="text-sm text-gray-500">
                            {investor.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {investor.phoneNumber}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">Investment Inquiry</div>
                          {investor.message && (
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {investor.message}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <div className="font-semibold">
                            ${investor.investmentAmount.toLocaleString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getInvestmentTypeBadge(investor.investmentType)}</TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500">{createdDate}</div>
                      </TableCell>
                      <TableCell>
                        {getInvestmentAmountBadge(investor.investmentAmount)}
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
                              Contact Investor
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteInvestor(investor)}
                            >
                              Delete Inquiry
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

      {/* Delete Investor Modal */}
      <DeleteInvestorModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        investor={investorToDelete}
      />
    </div>
  );
}
