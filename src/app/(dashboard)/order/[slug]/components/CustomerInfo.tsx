import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface CustomerInfoProps {
  data: any;
}

const CustomerInfo = ({ data }: CustomerInfoProps) => {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex items-start gap-2 w-full'>
          <div className='flex justify-between flex-wrap gap-2 w-full items-center'>
            <div className='flex gap-2 items-center w-fit'>
              {data && data?.chef?.profilePicture ? (
                <img
                  src={data && data?.chef?.profilePicture}
                  alt='asd'
                  className='rounded-full w-20 h-20'
                  width={20}
                  height={20}
                />
              ) : (
                <Avatar className='h-24 w-24'>
                  <AvatarFallback className='bg-blue-500 text-white font-semibold'>
                    {data &&
                      data?.chef?.firstName
                        .split(' ')
                        .map((n: any) => n[0])
                        .join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <p className='text-xs'>Professional Chef</p>
                <p className='text-lg'>
                  {data && data?.chef?.firstName} {data && data?.chef?.lastName}
                </p>
                <p className='text-icon-hex'>
                  ID {data && data?.chef?._id?.substr(0, 4)}
                </p>
                {/* Chef Phone Number */}
                {data && data?.chef?.phoneNumber && (
                  <div className='flex items-center gap-2 mt-2'>
                    <Phone className='h-4 w-4 text-gray-500' />
                    <span className='text-sm text-gray-600'>{data.chef.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>
            <div className='md:w-fit w-full'>
              <Link
                href={`/chef/${data && data?.chef?._id}`}
                className='p-3 text-white hover:text-black hover:bg-white border bg-red-200 rounded-4xl w-full'
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfo;
