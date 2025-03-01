import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className='flex justify-center items-center'>
      <SignIn
        routing='hash'
        forceRedirectUrl='/admin'
      />
    </div>
  );
};

export default page;
