'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { XCircle, Star } from 'lucide-react';

export default function OrderItemTable({ data }: any) {
  // Check if data and menuItems exist
  if (!data || !data.menuItems || data.menuItems.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <p className="text-gray-500 text-center py-8">No items found for this order.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Items</h2>
      <Table className='min-w-[800px]'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Items</TableHead>
            <TableHead className="text-center">Qty</TableHead>
            <TableHead className="text-center">Advance Payment</TableHead>
            <TableHead className="text-center">Total Price</TableHead>
            <TableHead className="text-center w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.menuItems.map((item: any, index: number) => {
            // Only render if menuItemId exists
            if (!item?.menuItemId) return null;
            
            const unitPrice = item?.menuItemId?.price || 0;
            const quantity = item?.quantity || 1;
            const totalPrice = unitPrice * quantity;
            const rating = item?.menuItemId?.rating || 5; // Default to 5 stars if not available
            const reviews = item?.menuItemId?.reviews || 454; // Default review count
            
            return (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex text-wrap gap-4 items-center">
                    <img
                      src={item?.menuItemId?.images?.[0] || '/placeholder.svg?height=60&width=60'}
                      alt={item?.menuItemId?.title || 'Item'}
                      width={60}
                      height={60}
                      className="rounded-md w-16 h-16 object-cover"
                    />
                    <div>
                      <div className="text-[12px] uppercase text-red-600 font-semibold">
                        {item?.menuItemId?.category || 'MAIN COURSE'}
                      </div>
                      <div className="font-semibold text-base text-wrap">
                        {item?.menuItemId?.title || 'Unknown Item'}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span>({reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{quantity}x</TableCell>
                <TableCell className="text-center">${unitPrice.toFixed(2)}</TableCell>
                <TableCell className="text-center font-semibold">${totalPrice.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  <button>
                    <XCircle className="text-red-500 hover:text-red-600 w-5 h-5" />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
