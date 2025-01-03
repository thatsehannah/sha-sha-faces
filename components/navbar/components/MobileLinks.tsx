import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { links } from '@/lib/links';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const MobileLinks = () => {
  return (
    <div className='lg:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu size={30} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {links.map((link, idx) => {
            return (
              <DropdownMenuItem
                key={idx}
                asChild
              >
                <Link
                  href={link.path}
                  className='capitalize w-full'
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button className='w-full'>
              <Link href='#'>Book Now</Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileLinks;
