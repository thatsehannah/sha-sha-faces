import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../ui/sidebar';
import { tabs } from '@/utils/links';
import Link from 'next/link';
import DarkModeButton from '@/components/global/DarkModeButton';
import Image from 'next/image';

const AdminSidebar = () => {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='bg-slate-100 border-b-2 dark:bg-slate-800 mb-4'>
        <Link href='/'>
          <Image
            src='/logo/logo-color-2.svg'
            priority
            alt='logo'
            width={400}
            height={400}
            className='h-[4rem] lg:h-[4rem]'
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-2xl uppercase font-medium mb-8'>
            dashboard <DarkModeButton />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabs.map((tab) => (
                <SidebarMenuItem
                  key={tab.title}
                  className='mb-4'
                >
                  <SidebarMenuButton
                    className='hover:bg-secondary p-5 transition-all duration-300'
                    asChild
                  >
                    <Link href={tab.url}>
                      <tab.icon />
                      <span className='text-xl font-light'>{tab.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AdminSidebar;
