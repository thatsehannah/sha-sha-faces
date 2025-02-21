import ManageAvailabilityCard from "@/components/dashboard/info/ManageAvailabilityCard";
import ManageGalleryCard from "@/components/dashboard/info/ManageGalleryCard";
import Container from "@/components/global/Container";
import { fetchAllPhotos } from "@/utils/actions";
import React from "react";

const AdminInfoPage = async () => {
  const photos = await fetchAllPhotos();

  return (
    <main>
      <Container className='py-20 w-screen lg:w-[80vw] flex flex-col gap-8'>
        <div>
          <ManageAvailabilityCard />
        </div>
        <div>
          <ManageGalleryCard photos={photos} />
        </div>
      </Container>
    </main>
  );
};

export default AdminInfoPage;
