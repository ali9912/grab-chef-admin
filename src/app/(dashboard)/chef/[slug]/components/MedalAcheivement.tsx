'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
const medals = [
  {
    id: 1,
    type: 'Silver Medal',
    status: 'Achieved',
    statusColor: 'text-green-500',
    icon: '🥈',
    bgColor: 'bg-gradient-to-br from-gray-300 to-gray-400',
  },
  {
    id: 2,
    type: 'Master Medal',
    status: '100 More to Master',
    statusColor: 'text-orange-500',
    icon: '🏆',
    bgColor: 'bg-gradient-to-br from-yellow-600 to-yellow-800',
  },
  {
    id: 3,
    type: 'Gold Medal',
    status: '15 More to gold',
    statusColor: 'text-orange-500',
    icon: '🥇',
    bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
  },
  {
    id: 4,
    type: 'Bronze Medal',
    status: 'Complete',
    statusColor: 'text-gray-400',
    icon: '🥉',
    bgColor: 'bg-gradient-to-br from-orange-400 to-orange-600',
  },
];

export const MedalsAchievement = ({ data }) => {
  return (
    <Card className='bg-white'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-lg lg:text-2xl font-semibold text-gray-900'>
          Medals Achievement
        </CardTitle>
      </CardHeader>
      {data?.length === 0 ? (
        <p className='text-center h-32 flex justify-center items-center'>No Achievements</p>
      ) : (
        <CardContent>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className='w-full max-w-4xl mx-auto'
          >
            <CarouselContent>
              {data &&
                data.map((medal, index) => (
                  <CarouselItem
                    className='basis-[50%] shrink-0 grow-0 pr-4'
                    key={medal?._id}
                  >
                    <div
                      key={medal?._id}
                      className='text-center'
                    >
                      <div className='h-36 w-36 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl shadow-lg'>
                        <img
                          src={medal?.image}
                          className={`w-26 h-26 `}
                        />
                      </div>
                      <h3 className='font-medium text-gray-900 text-xl mb-1'>
                        {medal.label + ' ' + 'Medal'}
                      </h3>
                      <p className={`text-xs ${medal.statusColor}`}>
                        {'Achieved'}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='text-red-500' />
            <CarouselNext
              className='text-red-500 '
              size={'lg'}
            />
          </Carousel>
        </CardContent>
      )}
    </Card>
  );
};
