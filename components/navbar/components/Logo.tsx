import Link from "next/link";
import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href='/'>
      <Image
        priority
        src='/branding/logo-color.svg'
        alt='logo'
        width={64}
        height={64}
      />
    </Link>
  );
};

export default Logo;
