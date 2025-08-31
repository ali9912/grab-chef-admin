'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowDown,
  Calendar,
  CircleCheck,
  CircleX,
  Search,
  X,
  RotateCcw,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import ReviewTable from './components/Reviewtable';
import { getCookie } from 'cookies-next/client';
import axios from 'axios';
import { BASE_API_URL } from '@/common/constants';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CustomPagination } from '@/components/ui/custom-pagination';

const Review = () => {
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
    dateMin: '',
    dateMax: '',
    ratingMin: '',
    ratingMax: ''
  });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getReviews = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie('token');
      const response = await axios.get(`${BASE_API_URL}/admin/get-reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(
        '===response.data===>',
        JSON.stringify(response.data, null, 1),
      );
      setData(response?.data?.reviews);
    } catch (error: any) {
      toast(error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateReviewStatus = useCallback(
    async (reviewId: string, status: boolean) => {
      try {
        setLoading(true);
        const token = getCookie('token');
        const response = await axios.post(
          `${BASE_API_URL}/admin/update-review-status/${reviewId}`,
          { status },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        // Refresh data after status update
        await getReviews();
      } catch (error: any) {
        toast(error?.message);
      } finally {
        setLoading(false);
      }
    },
    [getReviews],
  );

  useEffect(() => {
    getReviews();
  }, []);

  // Filter reviews based on search term and filters
  const filteredReviews = data.filter((review: any) => {
    // Search filter
    if (searchTerm.trim()) {
      const customerName = `${review?.customer?.firstName || ''} ${review?.customer?.lastName || ''}`.toLowerCase();
      const reviewText = (review.review || '').toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      if (!customerName.includes(searchLower) && !reviewText.includes(searchLower)) return false;
    }

    // Date filter
    if (filters.dateMin || filters.dateMax) {
      const reviewDate = new Date(review?.createdAt);
      if (filters.dateMin && reviewDate < new Date(filters.dateMin)) return false;
      if (filters.dateMax && reviewDate > new Date(filters.dateMax)) return false;
    }

    // Rating filter
    if (filters.ratingMin || filters.ratingMax) {
      const reviewRating = parseFloat(review.rating || 0);
      if (filters.ratingMin && reviewRating < parseFloat(filters.ratingMin)) return false;
      if (filters.ratingMax && reviewRating > parseFloat(filters.ratingMax)) return false;
    }



    return true;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Pagination logic
  const totalItems = filteredReviews.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate applied filters count
  const getAppliedFiltersCount = () => {
    let count = 0;
    if (filters.dateMin || filters.dateMax) count++;
    if (filters.ratingMin || filters.ratingMax) count++;
    return count;
  };

  return (
    <div className='p-6 w-full'>
      {/* Page Header */}
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-gray-900'>Review</h1>
        <p>Review/Task</p>
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
          {selectedReviews.length > 0 && (
            <div className='mr-10 flex gap-5 items-center'>
              <Button
                variant='outline'
                className='flex rounded-4xl hover:text-green-400 items-center space-x-2 bg-green-200 text-green-400 border border-green-400'
              >
                <CircleCheck className='h-4 w-4 ' />
                <span className='flex items-center gap-2'>Publish </span>
              </Button>
              <Button
                variant='outline'
                className='flex rounded-4xl hover:text-red-400 bg-red-200 border border-red-400 text-red-400 items-center space-x-2'
              >
                <CircleX className='h-4 w-4 ' />
                <span className='flex items-center gap-2'>Delete</span>
              </Button>
            </div>
          )}
          
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
                  ratingMin: '',
                  ratingMax: ''
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

            {/* Rating Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Rating Range</label>
              <div className="space-y-2">
                <Input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  placeholder="Min Rating"
                  value={filters.ratingMin}
                  onChange={(e) => setFilters(prev => ({ ...prev, ratingMin: e.target.value }))}
                  className="bg-white"
                />
                <Input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  placeholder="Max Rating"
                  value={filters.ratingMax}
                  onChange={(e) => setFilters(prev => ({ ...prev, ratingMax: e.target.value }))}
                  className="bg-white"
                />
              </div>
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
                  ratingMin: '',
                  ratingMax: ''
                });
              }}
            >
              Clear All
            </Button>
          </div>
        </div>
      )}

      <div className='min-h-screen py-8'>
        <div className='container mx-auto px-4'>
          <ReviewTable
            selectedReviews={selectedReviews}
            setSelectedReviews={setSelectedReviews}
            data={currentReviews || []}
            setData={setData}
            updateReviewStatus={updateReviewStatus}
          />
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

export default Review;
