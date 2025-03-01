import React from "react";
import { SignOutButton as SignOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SignOutButton = () => {
  return (
    <SignOut>
      <Button asChild>
        <Link href='/'>Logout</Link>
      </Button>
    </SignOut>
  );
};

export default SignOutButton;
