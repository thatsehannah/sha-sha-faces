import NewServiceForm from "@/components/dashboard/services/NewServiceForm";
import Container from "@/components/global/Container";
import { Separator } from "@/components/ui/separator";
import React from "react";

const AdminNewServicePage = () => {
  return (
    <main>
      <Container className='py-20 w-screen '>
        <div className='mb-3'>
          <p className='text-5xl font-normal'>Add a New Service</p>
        </div>
        <Separator />
        <NewServiceForm />
      </Container>
    </main>
  );
};

export default AdminNewServicePage;
