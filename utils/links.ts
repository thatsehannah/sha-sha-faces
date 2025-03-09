import {
  CalendarDays,
  EyeClosed,
  Home,
  Info,
  // ShoppingBasket,
} from "lucide-react";

export const publicLinks = [
  {
    label: "about",
    path: "/about",
  },
  {
    label: "portfolio",
    path: "/portfolio",
  },
  {
    label: "services",
    path: "/services",
  },
  {
    label: "shop",
    path: "/#shop",
  },
  {
    label: "reviews",
    path: "/reviews",
  },
];

export const adminLinks = [...publicLinks, { label: "admin", path: "/admin" }];

export const tabs = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Appointments",
    url: "/admin/appointments",
    icon: CalendarDays,
  },
  {
    title: "My Information",
    url: "/admin/info",
    icon: Info,
  },
  // {
  //   title: 'Orders',
  //   url: '/admin/orders',
  //   icon: ShoppingBasket,
  // },
  {
    title: "My Services",
    url: "/admin/services",
    icon: EyeClosed,
  },
];
