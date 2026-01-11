'use client'
import { useEffect, useState } from "react";
import { Search, Filter, MoreHorizontal, Calendar, ArrowDown, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Checkbox } from "@/components/ui/checkbox";
import { CustomPagination } from "@/components/ui/custom-pagination";
import Link from "next/link";
import { toast } from "sonner";
import { urls } from "@/api/urls";
import { getData } from "@/api/api";
import moment from "moment";
import { useRouter } from "next/navigation";

const Orders = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
    dateMin: '',
    dateMax: '',
    amountMin: '',
    amountMax: '',
    status: ''
  });
  const itemsPerPage = 10;

  const getOrders = async () => {
    try {
      const data = await getData(urls.order.getOrders)
      setOrders(data?.events)
    } catch (error:any) {
      console.log(error?.message)
      toast(error?.message)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>;
      case "pending":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelled</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>;
    }
  };

  const handleSelect = (id: string) => {
    let temp = [...selected]
    let index = temp.findIndex(i => i == id)
    if (index == -1) {
      temp.push(id)
    } else {
      temp.splice(index, 1)
    }
    console.log({ temp })
    setSelected(temp)
  }

  const filteredOrders = orders.filter((order: any) => {
    // Search filter
    if (searchTerm.trim()) {
      const customerName = `${order?.customer?.firstName || ''} ${order?.customer?.lastName || ''}`.toLowerCase();
      const location = (order.fullAddress?.name || '').toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      if (!customerName.includes(searchLower) && !location.includes(searchLower)) return false;
    }

    // Date filter
    if (filters.dateMin || filters.dateMax) {
      const orderDate = new Date(order?.date);
      if (filters.dateMin && orderDate < new Date(filters.dateMin)) return false;
      if (filters.dateMax && orderDate > new Date(filters.dateMax)) return false;
    }

    // Amount filter
    if (filters.amountMin || filters.amountMax) {
      const orderAmount = parseFloat(order.totalAmount || 0);
      if (filters.amountMin && orderAmount < parseFloat(filters.amountMin)) return false;
      if (filters.amountMax && orderAmount > parseFloat(filters.amountMax)) return false;
    }

    // Status filter
    if (filters.status && order.status?.toLowerCase() !== filters.status.toLowerCase()) return false;

    return true;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const totalItems = filteredOrders.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate applied filters count
  const getAppliedFiltersCount = () => {
    let count = 0;
    if (filters.dateMin || filters.dateMax) count++;
    if (filters.amountMin || filters.amountMax) count++;
    if (filters.status) count++;
    return count;
  };

  return (
    <div className="p-6 w-full">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Order Page List</h1>
        <p>Order/Order Details</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-icon-hex h-4 w-4" />
          <Input
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 bg-gray-50 rounded-4xl border-gray-200"
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Button 
              variant="outline" 
              className="flex rounded-4xl items-center space-x-2 cursor-pointer"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <Calendar className="h-4 w-4 text-icon-hex" />
              <span className="flex items-center gap-2">Filter <ArrowDown className="text-icon-hex" /></span>
            </Button>
            {getAppliedFiltersCount() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white rounded-full">
                {getAppliedFiltersCount()}
              </Badge>
            )}
          </div>
          {getAppliedFiltersCount() > 0 && (
            <Button 
              className="bg-yellow-400 w-10 h-10 rounded-full hover:bg-yellow-500 text-black"
              onClick={() => {
                setFilters({
                  dateMin: '',
                  dateMax: '',
                  amountMin: '',
                  amountMax: '',
                  status: ''
                });
                setSearchTerm('');
              }}
              title="Clear all filters"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilterPanel(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date Range</label>
              <div className="space-y-2">
                <Input
                  type="date"
                  placeholder="From Date"
                  value={filters.dateMin}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateMin: e.target.value }))}
                  className="bg-white"
                />
                <Input
                  type="date"
                  placeholder="To Date"
                  value={filters.dateMax}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateMax: e.target.value }))}
                  className="bg-white"
                />
              </div>
            </div>

            {/* Amount Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Amount Range</label>
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Min Amount"
                  value={filters.amountMin}
                  onChange={(e) => setFilters(prev => ({ ...prev, amountMin: e.target.value }))}
                  className="bg-white"
                />
                <Input
                  type="number"
                  placeholder="Max Amount"
                  value={filters.amountMax}
                  onChange={(e) => setFilters(prev => ({ ...prev, amountMax: e.target.value }))}
                  className="bg-white"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select
                value={filters.status || "all"}
                onValueChange={(value) => setFilters(prev => ({ ...prev, status: value === "all" ? "" : value }))}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setFilters({
                  dateMin: '',
                  dateMax: '',
                  amountMin: '',
                  amountMax: '',
                  status: ''
                });
              }}
            >
              Clear All
            </Button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white w-full rounded-lg border border-gray-200">
        <div className=" overflow-x-auto ">
          <Table className="min-w-[300px]">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12"></TableHead>
                <TableHead className="font-semibold text-gray-900">Order ID ⇅</TableHead>
                <TableHead className="font-semibold text-gray-900">Date ⇅</TableHead>
                <TableHead className="font-semibold text-gray-900">Customer Name ⇅</TableHead>
                <TableHead className="font-semibold text-gray-900">Location ⇅</TableHead>
                <TableHead className="font-semibold text-gray-900">Amount ⇅</TableHead>
                <TableHead className="font-semibold text-gray-900">Status Order ⇅</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order:any, index) => (
                <TableRow key={order._id} className={selected.includes(order.id) ? " shadow-md shadow-red-300 border-l-4 border-l-red-500" : ""}>
                  <TableCell className="font-medium text-blue-600"><Checkbox onCheckedChange={() => handleSelect(order._id)} /></TableCell>
                  <TableCell className="font-medium text-blue-600">
                    <Link href={`/order/${order._id?.replace('#','')}`}>#{order._id?.substr(order._id.length - 4)}</Link>
                  </TableCell>
                  <TableCell className="text-gray-600">{moment(order?.date).format('YYYY/DD/MM')}</TableCell>
                  <TableCell className="text-gray-900">{order?.customer?.firstName} {order.customer?.lastName || ''}</TableCell>
                  <TableCell className="text-gray-600">{order.fullAddress?.name || '-'}</TableCell>
                  <TableCell className="font-medium">{order.totalAmount || 0}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router?.push(`/order/${order._id?.replace('#','')}`)}> <Link href={`/order/${order._id?.replace('#','')}`}>View Details</Link></DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-6">
        <CustomPagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Orders;
