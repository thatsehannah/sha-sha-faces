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
    url: '#',
    icon: Home,
  },
  {
    title: 'Appointments',
    url: '#',
    icon: CalendarDays,
  },
  {
    title: 'My Information',
    url: '#',
    icon: Info,
  },
  {
    title: 'Orders',
    url: '#',
    icon: ShoppingBasket,
  },
  {
    title: 'My Services',
    url: '#',
    icon: EyeClosed,
  },
];
