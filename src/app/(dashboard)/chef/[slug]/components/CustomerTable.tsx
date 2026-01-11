'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const customers = [
  {
    id: '#C-00463',
    joinDate: '26 March 2020, 17:42 AM',
    chefName: 'Roberta Casas',
    location: 'Sea Manor Road London',
    status: 'Enable',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKNpeICypw6HglgXH9dwb2Uj4rG0eH9DXcQ&s',
  },
  {
    id: '#C-00456',
    joinDate: '26 March 2020, 01:42 PM',
    chefName: 'David Horison',
    location: "981 St. John's Road London",
    status: 'Enable',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKNpeICypw6HglgXH9dwb2Uj4rG0eH9DXcQ&s',
  },
  {
    id: '#C-00458',
    joinDate: '26 March 2020, 12:42 AM',
    chefName: 'Rendy Greenlee',
    location: '32 The Green London',
    status: 'Enable',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKNpeICypw6HglgXH9dwb2Uj4rG0eH9DXcQ&s',
    isSelected: true,
  },
  {
    id: '#C-00460',
    joinDate: '26 March 2020, 12:42 AM',
    chefName: 'Veronica',
    location: '21 King Street London',
    status: 'Disable',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKNpeICypw6HglgXH9dwb2Uj4rG0eH9DXcQ&s',
  },
  {
    id: '#C-00464',
    joinDate: '26 March 2020, 17:42 AM',
    chefName: 'Franky Shatang',
    location: '6 The Avenue London',
    status: 'Enable',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKNpeICypw6HglgXH9dwb2Uj4rG0eH9DXcQ&s',
  },
  {
    id: '#C-00460',
    joinDate: '26 March 2020, 12:42 AM',
    chefName: 'Veronica',
    location: '21 King Street London',
    status: 'Disable',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKNpeICypw6HglgXH9dwb2Uj4rG0eH9DXcQ&s',
  },
];

export const CustomerTable = ({ events }) => {
  return (
    <Card className='bg-white'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-200'>
              <th className='text-left py-4 px-6 font-medium text-gray-900'>
                Event ID
              </th>
              <th className='text-left py-4 px-6 font-medium text-gray-900'>
                Event Date
              </th>
              <th className='text-left py-4 px-6 font-medium text-gray-900'>
                Customer Name
              </th>
              <th className='text-left py-4 px-6 font-medium text-gray-900'>
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {
              events.length > 0 ?
              events.map((event:any, index:number) => (
                <tr
                  key={`${event.id}-${index}`}
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    event.isSelected
                      ? ' shadow-red-400 shadow-sm border-l-4 border-l-red-500'
                      : ''
                  }`}
                >
                  <td className='py-4 px-6'>
                    <div className='flex items-center'>
                      <img
                        src={event.customer?.profilePicture}
                        alt={event.customer?.profilePicture}
                        className='w-8 h-8 rounded-full mr-3 object-cover'
                      />
                      <span className='text-sm text-gray-600'>
                        {event._id?.split(event?._id.length - 4)}
                      </span>
                    </div>
                  </td>
                  <td className='py-4 px-6 text-sm text-gray-600'>
                    {new Date(event.date).getDate() +
                      ' - ' +
                      new Date(event.date).getMonth() +
                      ' - ' +
                      new Date(event.date).getFullYear() +
                      ' - '}
                  </td>
                  <td className='py-4 px-6'>
                    <div className='flex items-center'>
                      <span className='text-sm text-gray-900'>
                        {event?.customer?.firstName +
                          ' ' +
                          event?.customer?.lastName}
                      </span>
                    </div>
                  </td>
                  <td className='py-4 px-6 text-sm text-gray-600'>
                    {event?.fullAddress?.name || 'N/A'}
                  </td>
                </tr>
              )) : (
                <tr className='mt-5'>
                  <td colSpan={4} className='text-center mt-5'>
                    <p className='mt-5'>No Events found for this chef</p>
                    </td></tr>
              )}
          </tbody>
        </table>
      </div>

      <div className='flex items-center justify-center py-4'>
        <button className='flex items-center text-gray-400 hover:text-gray-600'>
          <ChevronDown className='w-8 h-8 text-red-400 shadow rounded-full' />
        </button>
      </div>
    </Card>
  );
};
