'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  ArrowDown,
  X,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { CustomPagination } from '@/components/ui/custom-pagination';
import Link from 'next/link';
import { getCookie } from 'cookies-next/client';
import axios from 'axios';
import { BASE_API_URL } from '@/common/constants';
import { toast } from 'sonner';

const ChefRequest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
    dateMin: '',
    dateMax: '',
    status: ''
  });
  const itemsPerPage = 10;

  const getChefRequests = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie('token');
      const response = await axios.get(
        `${BASE_API_URL}/admin/get-chefs-requests`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log(
        '===response.data===>',
        JSON.stringify(response.data, null, 1),
      );
      setData(response?.data?.chef);
    } catch (error: any) {
      toast(error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getChefRequests();
  }, []);

  const handleSelect = (id: string) => {
    let temp = [...selected];
    let index = temp.findIndex(i => i == id);
    if (index == -1) {
      temp.push(id);
    } else {
      temp.splice(index, 1);
    }
    setSelected(temp);
  };

  const updateReviewStatus = useCallback(
    async (requestId: string, status: 'rejected' | 'approved') => {
      const actionKey = `${requestId}-${status}`;
      try {
        setActionLoading(actionKey);
        const token = getCookie('token');
        const response = await axios.post(
          `${BASE_API_URL}/admin/update-chefs-requests/${requestId}`,
          { status },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log('===response===>', JSON.stringify(response, null, 1));
        
        // Update the specific item's status in the data
        setData(prevData => 
          prevData.map(chef => 
            chef.userId._id === requestId 
              ? { ...chef, status: status === 'approved' ? 'accepted' : 'rejected' }
              : chef
          )
        );
        
        toast.success(`Chef request ${status === 'approved' ? 'accepted' : 'rejected'} successfully`);
      } catch (error: any) {
        toast.error(error?.message || 'Failed to update status');
      } finally {
        setActionLoading(null);
      }
    },
    [],
  );

  // Filter and search logic
  const filteredData = data.filter((chef) => {
    // Search filter
    if (searchTerm.trim()) {
      const chefName = `${chef?.userId?.firstName || ''} ${chef?.userId?.lastName || ''}`.toLowerCase();
      const location = (Array.isArray(chef.locations) && chef.locations[0]?.name || '').toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      if (!chefName.includes(searchLower) && !location.includes(searchLower)) return false;
    }

    // Date filter
    if (filters.dateMin || filters.dateMax) {
      const chefDate = new Date(chef.createdAt);
      if (filters.dateMin && chefDate < new Date(filters.dateMin)) return false;
      if (filters.dateMax && chefDate > new Date(filters.dateMax)) return false;
    }



    // Status filter
    if (filters.status && chef.status?.toLowerCase() !== filters.status.toLowerCase()) return false;



    return true;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate applied filters count
  const getAppliedFiltersCount = () => {
    let count = 0;
    if (filters.dateMin || filters.dateMax) count++;
    if (filters.status) count++;
    return count;
  };

  return (
    <div className='p-6 w-full'>
      {/* Page Header */}
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-gray-900'>Chef Requests</h1>
        <p>Customer/Analytics</p>
      </div>

      {/* Search and Filter Bar */}
      <div className='flex items-center justify-between mb-6'>
        <div className='relative flex-1 max-w-sm'>
          <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-icon-hex h-4 w-4' />
          <Input
            placeholder='Search here'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pr-10 bg-gray-50 rounded-4xl border-gray-200'
          />
        </div>

        <div className='flex items-center space-x-2'>
          <div className='flex items-center gap-4'>
            <p className='flex items-center gap-3'>
              <img
                className='w-8 h-8'
                src={'/assets/icons/junior.png'}
              />
              <span>Represent For Junior</span>
            </p>
            <p className='flex items-center gap-3'>
              <img
                className='w-8 h-8'
                src={'/assets/icons/senior.png'}
              />
              <span>Represent For Senior</span>
            </p>
          </div>
          <div className="relative">
            <Button 
              variant="outline" 
              className="flex rounded-4xl items-center space-x-2 cursor-pointer"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <Calendar className='h-4 w-4 text-icon-hex' />
              <span className='flex items-center gap-2'>Filter <ArrowDown className='text-icon-hex' /></span>
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
              <label className="text-sm font-medium text-gray-700">Join Date Range</label>
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
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
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
      <div className='bg-white w-full rounded-lg border border-gray-200'>
        <div className=' overflow-x-auto '>
          <Table className='min-w-[300px]'>
            <TableHeader>
              <TableRow className='bg-gray-50'>
                <TableHead className='w-12'></TableHead>
                <TableHead className='font-semibold text-gray-900'>
                  Chef ID ⇅
                </TableHead>
                <TableHead className='font-semibold text-gray-900'>
                  Join Date ⇅
                </TableHead>
                <TableHead className='font-semibold text-gray-900'>
                  Chef Name ⇅
                </TableHead>
                <TableHead className='font-semibold text-gray-900'>
                  Location ⇅
                </TableHead>
                <TableHead className='font-semibold text-gray-900'>
                  Accept Chef ⇅
                </TableHead>
                <TableHead className='font-semibold text-gray-900'>
                  Reject Chef ⇅
                </TableHead>
                <TableHead className='w-12'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((chef, index) => (
                <TableRow
                  key={chef._id}
                  className={
                    selected.includes(chef._id)
                      ? ' shadow-md shadow-red-300 border-l-4 border-l-red-500'
                      : ''
                  }
                >
                  <TableCell className='font-medium text-blue-600'>
                    <Checkbox onCheckedChange={() => handleSelect(chef._id)} />
                  </TableCell>
                  <TableCell className='font-medium text-blue-600'>
                    <Link href={`#`}>
                      {chef._id?.slice(chef._id?.length - 4)}
                    </Link>
                  </TableCell>
                  <TableCell className='text-gray-600'>{`${new Date(chef.createdAt).getDate()}-${new Date(chef.createdAt).getMonth()}-${new Date(chef.createdAt).getFullYear()}`}</TableCell>
                  <TableCell className='text-gray-900 flex items-center gap-3'>
                    {!!chef?.experience && (
                      <img
                        className='w-6 h-6'
                        src={
                          chef.experience > 5
                            ? '/assets/icons/senior.png'
                            : '/assets/icons/junior.png'
                        }
                      />
                    )}
                    {`${chef?.userId.firstName} ${chef?.userId.lastName}`}
                  </TableCell>
                  <TableCell className='text-gray-600'>
                    {(Array.isArray(chef.locations) &&
                      chef?.locations.length &&
                      chef.locations[0].name) ||
                      'N/A'}
                  </TableCell>
                  <TableCell className='font-medium'>
                    <button
                      onClick={() =>
                        updateReviewStatus(chef?.userId._id, 'approved')
                      }
                      disabled={actionLoading === `${chef?.userId._id}-approved` || chef.status === 'accepted'}
                      className={`px-4 py-2 cursor-pointer rounded-full font-semibold text-white transition ${
                        chef.status === 'accepted' 
                          ? 'bg-green-200 cursor-not-allowed' 
                          : actionLoading === `${chef?.userId._id}-approved`
                            ? 'bg-green-400 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {actionLoading === `${chef?.userId._id}-approved` ? 'Accepting...' : 'Accept'}
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() =>
                        updateReviewStatus(chef?.userId._id, 'rejected')
                      }
                      disabled={actionLoading === `${chef?.userId._id}-rejected` || chef.status === 'rejected'}
                      className={`px-4 py-2 cursor-pointer rounded-full font-semibold text-white transition ${
                        chef.status === 'rejected' 
                          ? 'bg-red-200 cursor-not-allowed' 
                          : actionLoading === `${chef?.userId._id}-rejected`
                            ? 'bg-red-400 cursor-not-allowed'
                            : 'bg-red-500 hover:bg-red-600'
                      }`}
                    >
                      {actionLoading === `${chef?.userId._id}-rejected` ? 'Rejecting...' : 'Reject'}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
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

export default ChefRequest;
