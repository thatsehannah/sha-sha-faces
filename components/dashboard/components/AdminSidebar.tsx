"use client";

import React from "react";
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
  useSidebar,
} from "../../ui/sidebar";
import { tabs } from "@/utils/links";
import Link from "next/link";
import Image from "next/image";
import DarkModeButton from "@/components/global/DarkModeButton";
import SignOutButton from "./SignOutButton";

const AdminSidebar = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='bg-slate-100 border-b-2 dark:bg-slate-800 mb-4'>
        <Link href='/'>
          <Image
            src='/branding/logo-color-2.svg'
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
          <SidebarGroupLabel className='font-medium text-xl'>
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabs.map((tab) => (
                <SidebarMenuItem key={tab.title}>
                  <SidebarMenuButton
                    className='hover:bg-secondary p-5 transition-all duration-300'
                    asChild
                  >
                    <Link
                      href={tab.url}
                      onClick={() => setOpenMobile(false)}
                    >
                      <tab.icon />
                      <span className='font-light'>{tab.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <DarkModeButton />
              <SignOutButton />
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
