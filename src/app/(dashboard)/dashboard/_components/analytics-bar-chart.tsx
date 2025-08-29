'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useCustomers } from '@/common/contexts/CustomersContext';


const chartConfig = {
  customers: {
    label: 'Customers',
    color: 'url(#orangeGradient)',
  },
} satisfies ChartConfig;

export function AnalyticsBarChart() {
  const { customers, loading, error } = useCustomers();
  const [timePeriod, setTimePeriod] = React.useState<'monthly' | 'weekly' | 'daily'>('weekly');

  const chartData = React.useMemo(() => {
    if (!customers || customers.length === 0) {
      return [];
    }

    const today = new Date();
    const data = [];
    
    switch (timePeriod) {
      case 'daily':
        for (let i = 59; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          
          const dayCustomers = customers.filter(customer => {
            const customerDate = new Date(customer.createdAt);
            return customerDate.toDateString() === date.toDateString();
          }).length;
          
          data.push({
            date: date.toISOString().split('T')[0],
            customers: Math.max(0, dayCustomers),
          });
        }
        break;

      case 'weekly':
        for (let i = 29; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - (i * 7));
          
          const weekCustomers = customers.filter(customer => {
            const customerDate = new Date(customer.createdAt);
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            
            return customerDate >= weekStart && customerDate <= weekEnd;
          }).length;
          
          data.push({
            date: date.toISOString().split('T')[0],
            customers: Math.max(0, weekCustomers),
          });
        }
        break;

      case 'monthly':
        for (let i = 11; i >= 0; i--) {
          const date = new Date(today);
          date.setMonth(date.getMonth() - i);
          
          const monthCustomers = customers.filter(customer => {
            const customerDate = new Date(customer.createdAt);
            return customerDate.getMonth() === date.getMonth() && 
                   customerDate.getFullYear() === date.getFullYear();
          }).length;
          
          data.push({
            date: date.toISOString().split('T')[0],
            customers: Math.max(0, monthCustomers),
          });
        }
        break;
    }
    
    return data;
  }, [customers, timePeriod]);

  const total = React.useMemo(
    () => ({
      customers: chartData.reduce((acc, curr) => acc + curr.customers, 0),
    }),
    [chartData],
  );

  const getDateFormatter = () => {
    switch (timePeriod) {
      case 'daily':
        return (value: string) => {
          const date = new Date(value);
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });
        };
      case 'weekly':
        return (value: string) => {
          const date = new Date(value);
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });
        };
      case 'monthly':
        return (value: string) => {
          const date = new Date(value);
          return date.toLocaleDateString('en-US', {
            month: 'short',
            year: '2-digit',
          });
        };
      default:
        return (value: string) => value;
    }
  };

  const getTooltipFormatter = () => {
    switch (timePeriod) {
      case 'daily':
        return (value: string) => {
          return new Date(value).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
        };
      case 'weekly':
        return (value: string) => {
          const date = new Date(value);
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          
          return `${weekStart.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })} - ${weekEnd.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}`;
        };
      case 'monthly':
        return (value: string) => {
          return new Date(value).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          });
        };
      default:
        return (value: string) => value;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
          <div className='flex flex-1 flex-col justify-center gap-1 px-6'>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>Loading customer data...</CardDescription>
          </div>
        </CardHeader>
        <CardContent className='px-2 sm:p-6'>
          <div className='aspect-auto h-[250px] w-full flex items-center justify-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-red-500'></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
          <div className='flex flex-1 flex-col justify-center gap-1 px-6'>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription className='text-red-500'>Error: {error}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const getTimePeriodDescription = () => {
    switch (timePeriod) {
      case 'daily':
        return 'Daily customer counts over the last 30 days';
      case 'weekly':
        return 'Weekly customer counts over the last 30 weeks';
      case 'monthly':
        return 'Monthly customer counts over the last 12 months';
      default:
        return 'Customer growth trends';
    }
  };

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6'>
          <CardTitle>Customer Growth</CardTitle>
          <CardDescription>
            {getTimePeriodDescription()}
          </CardDescription>
        </div>
        <div className='flex items-center px-6 sm:px-8'>
          <div className='flex rounded-full bg-gray-100 p-1 shadow-md'>
            {(['monthly', 'weekly', 'daily'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  timePeriod === period
                    ? 'bg-red-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 cursor-pointer'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="orangeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#fb2c36" />
                <stop offset="100%" stopColor="#FFB366" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={getDateFormatter()}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='customers'
                  labelFormatter={getTooltipFormatter()}
                />
              }
            />
            <Bar
              dataKey='customers'
              fill="url(#orangeGradient)"
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
