'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  ArrowDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
      try {
        setLoading(true);
        const token = getCookie('token');
        const response = await axios.post(
          `${BASE_API_URL}/admin/update-chefs-requests/${requestId}`,
          { status },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log('===response===>', JSON.stringify(response, null, 1));
      } catch (error: any) {
        toast(error?.message);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

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
          <Button
            variant='outline'
            className='flex rounded-4xl items-center space-x-2'
          >
            <Calendar className='h-4 w-4 text-icon-hex' />
            <span className='flex items-center gap-2'>
              Filter <ArrowDown className='text-icon-hex' />
            </span>
          </Button>
          <Button className='bg-yellow-400 w-10 h-10 rounded-full hover:bg-yellow-500 text-black'>
            <span className=''>⊕</span>
          </Button>
        </div>
      </div>

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
              {data.map((chef, index) => (
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
                      className={`px-4 py-2 cursor-pointer rounded-full font-semibold text-white ${chef.status !== 'verified' ? 'bg-green-500' : 'bg-green-200'} hover:bg-green-600 transition`}
                    >
                      Accept
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() =>
                        updateReviewStatus(chef?.userId._id, 'rejected')
                      }
                      className={`px-4 py-2 cursor-pointer rounded-full font-semibold text-white { ${chef.status == 'rejected' ? 'bg-red-200' : 'bg-red-500'} hover:bg-red-600 transition`}
                    >
                      Reject
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {/* <div className='flex items-center justify-between mt-6'>
        <p className='text-sm text-gray-600'>
          Showing <span className='font-bold'>10</span> from{' '}
          <span className='font-bold'>46</span> data
        </p>

        <div className='flex items-center space-x-2'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              <PaginationItem className='rounded-full'>
                <PaginationLink
                  className='rounded-full'
                  href='#'
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href='#'
                  isActive
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div> */}
    </div>
  );
};

export default ChefRequest;
