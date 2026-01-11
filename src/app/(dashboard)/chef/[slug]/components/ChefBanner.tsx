import { Card } from '@/components/ui/card';
import { ChefDetailCard } from './chef-card';
import Image from 'next/image';

interface ChefBannerProps {
  chef?: any;
}

export const ChefBanner = ({ chef }: ChefBannerProps) => {
  const chefName = chef ? `${chef.firstName} ${chef.lastName}` : 'Chef';
  const chefLevel = chef?.chef?.level || 'Chef';
  const chefImage = chef?.profilePicture || '/assets/images/chef-femal.png';

  return (
    <Card className="relative min-h-64 p-8 bg-[url('/assets/images/chefbg.png')] flex xl:justify-start items-center xl:items-start text-white border-0">
      <div className='flex space-between'>
        <div>
          <h3 className='text-3xl font-bold'>{chefName}</h3>
          <h3 className='text-base'>{chefLevel}</h3>
        </div>
        <Image src={chefImage} alt={chefName} width={400} height={500}/>
      </div>
    </Card>
  );
};
