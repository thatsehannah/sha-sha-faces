import UploadPhotoForm from "@/components/dashboard/info/UploadPhotoForm";
import Container from "@/components/global/Container";
import { Separator } from "@/components/ui/separator";
import React from "react";

const AdminAddPhotoPage = () => {
  return (
    <main>
      <Container className='py-20 w-screen '>
        <div>
          <p className='text-3xl lg:text-5xl font-normal mb-2'>
            Upload Photos to Portfolio
          </p>
          <Separator className='mb-4' />
          <UploadPhotoForm />
        </div>
      </Container>
    </main>
  );
};

export default AdminAddPhotoPage;
