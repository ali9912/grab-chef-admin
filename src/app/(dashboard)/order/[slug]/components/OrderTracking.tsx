
'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Phone, MapPin, Clock, ChefHat, CreditCard, Package, MessageSquare, Plane } from 'lucide-react';
import OrderStatusTimeline from './OrderStatusTimeline';
import DeliveryMap from './DeliveryMap';
import CustomerInfo from './CustomerInfo';
import OrderItems from './OrderItems';
import OrderAnalytics from './OrderAnalytics';
import CustomerOrderCard from './CustomerOrderCard';
import { toast } from 'sonner';
import { getData } from '@/api/api';
import { urls } from '@/api/urls';
import { useParams } from 'next/navigation';
import CustomerFavoriteChefs from '@/app/(dashboard)/dashboard/_components/CustomerFavoriteChefs';

const OrderTracking = () => {
  const [details, setDetails ] = useState<any>(null)
  const [attendence, setAttendence ] = useState<any>({
    attendance:[],
    durationMinutes:0
  })
  const params = useParams()
  const [customerFavoriteChefs, setCustomerFavoriteChefs] = useState<any>([])
  const getOrderDetails = async () => {
    try {
      if(params?.slug){
        const data = await getData(urls.order.getOrder(params?.slug as string))
        const attendenceData = await getData(urls.order?.getAttendence(params?.slug as string))
        setAttendence(attendenceData)
        setDetails(data?.event)
        setCustomerFavoriteChefs(data?.customerFavoriteChefs)
      }
    } catch (error:any) {
      console.log(error?.message)
      toast(error?.message)
    }
  }

  useEffect(() => {
    if(params?.slug)
      getOrderDetails()
  },[params])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order ID #{details?._id?.substr(details?._id.length-4)}</h1>
          </div>
          <div className="flex items-center gap-2">
            <p>Order Details/ Customers</p>
          </div>
        </div>

        {/* Order Status Timeline */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <OrderStatusTimeline data={details} currentStatus={''}/>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map and Customer */}
          <div className="lg:col-span-2 col-span-full space-y-6">
            {/* Delivery Map */}
            <div>
              <div className="p-0">
                <DeliveryMap data={attendence?.attendance} address={details?.fullAddress}/>
              </div>
            </div>

            {/* Customer Info */}
            <div className='grid grid-cols-3 gap-3'>
              <div className="lg:col-span-2 col-span-full space-y-6">
                <CustomerInfo data={details} />

              </div>
              <div className='lg:col-span-1 col-span-full'>
                <Card className='h-full flex justify-center items-center'>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        <Plane className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Estimated Time</p>
                        <p className="text-lg font-bold text-gray-900">{attendence?.durationMinutes || 0}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className='col-span-full'>
                <OrderItems data={details}/>

              </div>
            </div>
          </div>

          {/* Right Column - Order Details */}
          <div className="space-y-6 lg:col-span-1 col-span-full">
            {/* Estimated Time */}
            <CustomerOrderCard data={details}/>

            {/* Order Analytics */}
            <CustomerFavoriteChefs customerFavoriteChefs={customerFavoriteChefs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
