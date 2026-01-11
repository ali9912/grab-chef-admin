'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';

import SidebarLogo from '../../../../public/assets/images/sidebar-logo.svg';

import { sidebarItems } from '@/common/constants/data';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      variant='sidebar'
      collapsible='offcanvas'
      className='flex flex-col justify-between gap-y-5'
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='flex justify-start h-[127px]'>
            <Image
              src={SidebarLogo}
              alt='logo'
              width={193}
              height={127}
            />
          </SidebarGroupLabel>
          <SidebarGroupContent className='px-6 mt-4 '>
            <SidebarMenu className='space-y-4'>
              {sidebarItems.map(item => (
                <SidebarMenuItem
                  className='mt-3'
                  key={item.title}
                >
                  <SidebarMenuButton
                    className={cn(
                      'hover:bg-[#FFF3F0] hover:text-primary rounded-[53px]',
                      'h-[67px] px-6',
                      'text-[18px] font-medium text-[#9B9B9B] hover:text-[#1E1E1E]',
                      item.url.includes(pathname)
                        ? 'bg-[#FFF3F0] text-[#1E1E1E]'
                        : 'bg-transparent ',
                    )}
                    asChild
                  >
                    <a
                      href={item.url}
                      className='flex items-center gap-x-6'
                    >
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={24}
                        height={24}
                      />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
