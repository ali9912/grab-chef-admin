import { Phone, Calendar, MapPin } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';

export default function CustomerOrderCard({data}:any) {
  // Check if data exists
  if (!data) {
    return (
      <div className="w-full mx-auto bg-white rounded-xl shadow-md p-6 font-sans space-y-4">
        <p className="text-gray-500 text-center py-8">No order data available.</p>
      </div>
    );
  }

  const subtotal = data?.menuItems?.reduce((acc: number, item: any) => {
    if (item?.menuItemId?.price && item?.quantity) {
      return acc + (item.menuItemId.price * item.quantity);
    }
    return acc;
  }, 0) || 0;

  const deliveryFee = 400; // This could be dynamic based on data
  const total = subtotal + deliveryFee;

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md p-6 font-sans space-y-4">
      {/* Header - Customer Information */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={data?.customer?.profilePicture || "https://randomuser.me/api/portraits/men/32.jpg"}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-base font-semibold text-gray-900">
            {data?.customer?.firstName || 'Unknown'} {data?.customer?.lastName || ''}
          </h2>
          <p className="text-xs text-red-600">
            Customer ID : {data?.customer?._id?.substr(data?.customer?._id?.length - 6) || 'N/A'}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">m</span>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <div className="bg-yellow-400 p-2 rounded-full">
            <Phone size={16} className="text-black" />
          </div>
          <span className="font-medium text-gray-900">{data?.customer?.phoneNumber || 'Not provided'}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="bg-yellow-400 p-2 rounded-full">
            <MapPin size={16} className="text-black" />
          </div>
          <span className="font-medium text-gray-900">
            {data?.fullAddress?.name || data?.address || 'Address not provided'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="bg-yellow-400 p-2 rounded-full">
            <Calendar size={16} className="text-black" />
          </div>
          <span className="font-medium text-gray-900">
            {data?.updatedAt ? moment(data.updatedAt).format('DD MMMM YYYY') : 'Date not available'}
          </span>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200"></div>

      {/* Time Row */}
      <div className="flex justify-between text-sm font-medium pt-2">
        <span className="text-gray-500">Time</span>
        <span className="text-gray-900">{data?.time || 'Time not specified'}</span>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200"></div>

      {/* Order List */}
      <div className="space-y-3 text-sm text-gray-900">
        {data?.menuItems?.length > 0 ? (
          data.menuItems.map((item:any, index:number) => {
            if (!item?.menuItemId) return null;
            
            const itemPrice = item?.menuItemId?.price || 0;
            const quantity = item?.quantity || 1;
            const totalItemPrice = itemPrice * quantity;
            
            return (
              <div key={index} className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <span>{quantity}x {item?.menuItemId?.title || 'Unknown Item'}</span>
                </div>
                <div className="text-xs">Rs. {totalItemPrice}</div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center py-4">No items in this order</p>
        )}
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200"></div>

      {/* Subtotal & Delivery */}
      <div className="text-sm space-y-1">
        <div className="flex justify-between">
          <span className="font-semibold">Subtotal</span>
          <span className="text-gray-900 font-semibold">
            Rs. {subtotal}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Delivery Fee</span>
          <span className="text-gray-900">Rs. {deliveryFee}</span>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200"></div>

      {/* Total */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Total <span className="text-sm font-normal text-gray-500">(Incl.Tax)</span></h3>
        <span className="text-lg font-bold">Rs. {total}</span>
      </div>
    </div>
  );
}
