import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, MoveDown } from "lucide-react";
import { useState } from "react";
import { useCustomers } from "@/common/contexts/CustomersContext";

const CustomersList = () => {
  const { customers, loading, error } = useCustomers();
  const [customersShow, setCustomersShow] = useState(5);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Customers</CardTitle>
          <p className="text-sm text-muted-foreground">Loading customers...</p>
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
          <CardTitle className="text-lg font-medium">Customers</CardTitle>
          <p className="text-sm text-red-500">Error: {error}</p>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">Customers</CardTitle>
          <p className="text-sm text-muted-foreground">Lorem ipsum dolor</p>
        </div>
        <Button size="icon" className="bg-red-500 hover:bg-red-600 rounded-full">
          <span className="text-white text-2xl">+</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {customers?.length > 0 && customers?.slice(0, customersShow).map((customer:any) => (
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

      {customers?.length > customersShow && (
        <div onClick={() => setCustomersShow(prev => prev+5)} className="mx-auto h-4 w-4 shadow-black shadow-2xl rounded-full cursor-pointer">
          <ChevronDown />
        </div>
      )}
    </Card>
  );
};

export default CustomersList;
