import React from "react";
import Logo from "./components/Logo";
import Links from "./components/Links";
import { Button } from "../ui/button";
import MobileLinks from "./components/MobileLinks";
import Container from "../global/Container";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { adminLinks, publicLinks } from "@/utils/links";
import Link from "next/link";
import DarkModeButton from "../global/DarkModeButton";

const Navbar = () => {
  return (
    <nav className='border-b-2 sticky top-0 z-10 w-full bg-background'>
      <Container className='flex flex-row justify-between items-center py-4'>
        <Logo />
        <SignedOut>
          <Links links={publicLinks} />
        </SignedOut>
        <SignedIn>
          <Links links={adminLinks} />
        </SignedIn>
        <DarkModeButton />
        <Button
          className='hidden lg:flex bg-primary text-center text-lg'
          asChild
        >
          <Link href='/contact'>Book Now </Link>
        </Button>
        <SignedOut>
          <MobileLinks links={publicLinks} />
        </SignedOut>
        <SignedIn>
          <MobileLinks links={adminLinks} />
        </SignedIn>
      </Container>
    </nav>
  );
};

export default Navbar;
