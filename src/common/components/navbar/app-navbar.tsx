'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import UserImage from '../../../../public/assets/images/user.png';
import chat from '../../../../public/assets/icons/chat.svg';
import bell from '../../../../public/assets/icons/bell.svg';
import { LogOut } from 'lucide-react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import SearchBar from '../common/search-bar';
import { useState } from 'react';

export default function NavbarComp() {
  const [search, setSearch] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('oken');
    router.push('/login');
  };

  return (
    <div className='min-h-24 h-fit py-2 sm:flex-row flex-col flex justify-between sm:items-center items-start lg:px-8 px-4 gap-1 w-full shadow-sm bg-white'>
      <div className='flex items-center gap-x-8'>
        <div className='mt-2'>
          <SidebarTrigger />
        </div>
        <SearchBar
          search={search}
          setSearch={setSearch}
        />
      </div>
      <div className='flex items-center sm:justify-center justify-between gap-x-6 w-full sm:w-fit sm:mb-0 mb-2'>
        <div className='flex items-center gap-x-6'>
          <Image
            src={bell}
            alt='bell'
            width={30}
            height={30}
            className='cursor-pointer hover:scale-110 transition-transform duration-200'
          />
          <Image
            src={chat}
            alt='chat'
            width={30}
            height={30}
            className='cursor-pointer hover:scale-110 transition-transform duration-200'
          />
        </div>
        <hr className='h-[56px] border-l border-[#E9E9E9]' />
        <div className='flex items-center gap-x-4'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto w-auto rounded-full">
                <Image
                  src={UserImage}
                  alt='profile'
                  width={48}
                  height={48}
                  className='cursor-pointer hover:opacity-80 transition-opacity rounded-full'
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" align="end">
              <div className="space-y-2">
                {/* <div className="px-2 py-1">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@grabchef.com</p>
                </div>
                <div className="border-t border-gray-200"></div> */}
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col'>
          <Select defaultValue='english'>
            <SelectTrigger
              className={cn(
                'w-[171px] min-h-[56px] rounded-[53px] text-[16px] font-normal text-black',
                'ring-0 ring-offset-0 border-none outline-none bg-[#FFF3F0]',
                'focus-visible:ring-offset-0 focus-visible:ring-0 py-2',
              )}
            >
              <SelectValue placeholder='Select Language' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value='english'
                className='flex items-center gap-2 text-[16px] font-medium text-[#1E1E1E]'
              >
                <Image
                  src='/assets/icons/us.svg'
                  alt='us'
                  width={28}
                  height={28}
                  className='rounded-full w-7 h-7'
                />
                English
              </SelectItem>
              <SelectItem
                value='spanish'
                className='flex items-center gap-2 text-[16px] font-medium text-[#1E1E1E]'
              >
                <Image
                  src='/assets/icons/us.svg'
                  alt='spn'
                  width={28}
                  height={28}
                  className='rounded-full w-7 h-7'
                />
                Spanish
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
