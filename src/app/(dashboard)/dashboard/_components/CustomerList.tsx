import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCustomers } from "@/common/contexts/CustomersContext";
import DownArrowButton from "./DownArrowButton";
import { Plus } from "lucide-react";

const CustomersList = () => {
  const { customers, loading, error } = useCustomers();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>Loading customers...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription className="text-sm text-red-500">Error: {error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className='flex flex-1 flex-col justify-center gap-1'>
          <CardTitle>Customers</CardTitle>
          <CardDescription>Lorem ipsum dolor</CardDescription>
        </div>
        <Button size="icon" className="bg-red-500 hover:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
          <Plus className="text-white scale-150" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {customers?.length > 0 && customers?.slice(0, 7).map((customer:any) => (
          <div key={customer?._id} className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gray-100">
                {customer.firstName?.substring(0,1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium text-lg">{customer.firstName} {customer?.lastName || ''}</div>
              {/* <p className="text-base text-red-400">
                {customer.type}
              </p> */}
            </div>
          </div>
        ))}
      </CardContent>

      <DownArrowButton onClick={() => {}} />
    </Card>
  );
};

export default CustomersList;
