import Container from "@/components/global/Container";
import { Separator } from "@/components/ui/separator";
import React from "react";

const AdminNewServicePage = () => {
  return (
    <main>
      <Container className='py-20 w-screen lg:w-[80vw]'>
        <div className='mb-3'>
          <p className='text-5xl font-normal'>Add A New Service</p>
        </div>
        <Separator />
      </Container>
    </main>
  );
};

export default AdminNewServicePage;
