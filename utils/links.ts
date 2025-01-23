import {
  CalendarDays,
  EyeClosed,
  Home,
  Info,
  ShoppingBasket,
} from 'lucide-react';

export const links = [
  {
    label: 'about',
    path: '/about',
  },
  {
    label: 'gallery',
    path: '/gallery',
  },
  {
    label: 'services',
    path: '/services',
  },
  {
    label: 'contact',
    path: '/contact',
  },
];

export const tabs = [
  {
    title: 'Home',
    url: '/admin',
    icon: Home,
  },
  {
    title: 'Appointments',
    url: '/admin/appointments',
    icon: CalendarDays,
  },
  {
    title: 'My Information',
    url: '/admin/info',
    icon: Info,
  },
  {
    title: 'Orders',
    url: '/admin/orders',
    icon: ShoppingBasket,
  },
  {
    title: 'My Services',
    url: '/admin/services',
    icon: EyeClosed,
  },
];
