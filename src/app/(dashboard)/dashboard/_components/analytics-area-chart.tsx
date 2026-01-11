'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next/client';
import axios from 'axios';
import { BASE_API_URL } from '@/common/constants';

interface RevenueStatsResponse {
  todayRevenue: number;
  yesterdayRevenue: number;
  percentageChange: number;
  trend: 'increase' | 'decrease' | 'no change';
  monthlyRevenue: Array<{
    month: string;
    total: number;
  }>;
}

interface ChartDataProps {
  chartData: {
    month: string;
    revenue: number;
  }[];
}

export function AreaChartComponent() {
  const [revenueData, setRevenueData] = useState<RevenueStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRevenueStats = async () => {
    try {
      setLoading(true);
      const token = getCookie('token');
      const response = await axios.get(
        `${BASE_API_URL}/admin/get-revenue-stats`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRevenueData(response.data);
    } catch (error: any) {
      setError(error?.message || 'Failed to fetch revenue data');
      console.error('Revenue stats error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRevenueStats();
  }, []);

  // Transform monthly revenue data for chart
  const chartData = revenueData?.monthlyRevenue?.map(item => ({
    month: item.month,
    revenue: item.total
  })) || [];

  const chartConfig = {
    revenue: {
      label: 'Revenue',
      color: '#FFC71F',
    },
  };

  if (loading) {
    return (
      <Card className="relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className='flex flex-1 flex-col justify-center gap-1'>
            <CardTitle>Today's Revenue</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">Loading...</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className='flex flex-1 flex-col justify-center gap-1'>
            <CardTitle>Today's Revenue</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">Error</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full flex items-center justify-center text-red-500">
            Failed to load revenue data
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increase':
        return '↗';
      case 'decrease':
        return '↘';
      default:
        return '→';
    }
  };
  
  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className='flex flex-1 flex-col justify-center gap-1'>
          <CardTitle>Today's Revenue</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur
          </CardDescription>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">
            PKR {revenueData?.todayRevenue?.toFixed(2) || '0.00'}
          </div>
          <div className={`text-xs ${getTrendColor(revenueData?.trend || 'no change')}`}>
            {getTrendIcon(revenueData?.trend || 'no change')} {revenueData?.percentageChange?.toFixed(1) || '0'}% than last day
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer 
          config={chartConfig}
          className="h-[180px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 8,
              bottom: 8,
            }}
          >
            <CartesianGrid 
              vertical={true} 
              horizontal={true}
              strokeDasharray="3 3"
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12, fill: '#666' }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12, fill: '#666' }}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor="#ffc720" stopOpacity={1}/>
                <stop offset="100%" stopColor="#ffc720" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <Area
              dataKey='revenue'
              type='bump'
              fill='url(#revenueGradient)'
              strokeWidth={0}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
