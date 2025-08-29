'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AnalyticsCardProps {
  title: string;
  value: string;
  image: string;
  progress: number;
}

export function AnalyticsCard({ data }: { data: AnalyticsCardProps }) {
  const circumference = 2 * Math.PI * 20;
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (data.progress / 100) * circumference;

  return (
    <div
      className={cn(
        'flex items-center justify-between shadow-sm border',
        'bg-[FFECEC] rounded-[20px] px-6 py-4 min-h-[148px]',
      )}
    >
      <div>
        <p className='text-[16px] font-medium text-[#9B9B9B]'>{data.title}</p>
        <p className='text-[40px] font-semibold text-[#202020]'>{data.value}</p>
      </div>
      <div className='relative'>
        <svg
          className='w-24 h-24 transform -rotate-90'
          viewBox='0 0 50 50'
        >
          <defs>
            <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff390b" />
              <stop offset="50%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#FFC41F" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            cx='25'
            cy='25'
            r='20'
            fill='none'
            stroke='#ffecec'
            strokeWidth='5'
          />
          {/* Progress circle */}
          <circle
            cx='25'
            cy='25'
            r='20'
            fill='none'
            stroke="url(#progressGradient)"
            strokeWidth='5'
            strokeLinecap='round'
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className='transition-all duration-300 ease-in-out'
          />
        </svg>
        {data.image && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className={'p-2 rounded-full bg-white'}>
              <Image
                src={data.image}
                alt={data.title}
                width={30}
                height={30}
                className='object-contain max-h-[30px] max-w-[30px] h-auto w-auto'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
